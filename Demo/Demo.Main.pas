unit Demo.Main;

interface

uses
  WHATWG.Console, WHATWG.XHR, ECMA.TypedArray, W3C.DOM4, W3C.Html5,
  W3C.FileAPI, W3C.WebAudio, SimpleSofaFile,
  Demo.Framework, Demo.Audio, Demo.Hrtf;

type
  TFileSelect = class(TDivElement)
  private
    FInputFile: TInputFileElement;
  public
    procedure AfterConstructor; override;

    property InputFile: TInputFileElement read FInputFile;
    property OnLoad: procedure(Buffer: JArrayBuffer);
  end;

  THeader = class(TDivElement)
  private
    FHeading: TH1Element;
    FFileSelect: TFileSelect;
  public
    procedure AfterConstructor; override;

    property FileSelect: TFileSelect read FFileSelect;
  end;

  TPlane2D = class(TCanvas2dElement)
  public
    procedure Resize; override;
    procedure Paint;
  end;

  TGlyph = class(TImageElement)
  private
    FName: String;
  public
    constructor Create(Owner: IHtmlElementOwner; TrackName: String); overload;

    property Name: String read FName;
  end;

  TMainScreen = class(TDivElement)
  private
    FHeader: THeader;
    FTextArea: TTextAreaElement;
    FSofaFile: TSofaFile;
    FPlane2D: TPlane2D;
    FGlyphs: array of TGlyph;
    FTracks: array of TTrack;
    FHrtfs: THrtfs;

    procedure AddText(Text: String);
    procedure LoadSofaFile(Buffer: JArrayBuffer);
    procedure PrepareHrtfs;
    procedure RandomizeHrtfPositions;
    procedure PrintFileInformation;
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;
    procedure InitializeAudioEngine;
  end;

var
  MainScreen: TMainScreen;

implementation

uses
  W3C.CSSOMView;

const
  CTrackNames = ['Vocal', 'Piano', 'Bass', 'Drums'];

{ TFileSelect }

procedure TFileSelect.AfterConstructor;
begin
  FInputFile := TInputFileElement.Create(Self as IHtmlElementOwner);
  FInputFile.InputElement.accept := '.sofa';
  FInputFile.InputElement.addEventListener('change',
    lambda(Event: JEvent)
      var Files : JFileList = JFileList(Variant(Event.target).files);
      var Reader := JFileReader.Create;
      Reader.onload := lambda
        if Assigned(OnLoad) then
          OnLoad(JArrayBuffer(Reader.result));
        Result := nil;
      end;
      Reader.readAsArrayBuffer(Files[0]);
    end);
end;


{ THeader }

procedure THeader.AfterConstructor;
begin
  FHeading := TH1Element.Create(Self as IHtmlElementOwner);
  FHeading.Text := 'WebSofa Demo';

  FFileSelect := TFileSelect.Create(Self as IHtmlElementOwner);
end;


{ TPlane2D }

procedure TPlane2D.Resize;
begin
  var R := CanvasElement.getBoundingClientRect;

  var MinSize := Round(min(Window.innerWidth - R.left, Window.innerHeight - R.top));
  Style.width := IntToStr(MinSize) + 'px';
  Style.height := IntToStr(MinSize) + 'px';

  R := CanvasElement.getBoundingClientRect;

  CanvasElement.Width := Round(Application.PixelRatio * R.width);
  CanvasElement.Height := Round(Application.PixelRatio * R.height);

  Paint;
end;

procedure TPlane2D.Paint;
begin
  var Size := Min(CanvasElement.Width, CanvasElement.Height);
  Context.strokeStyle := '#CA3631';
  Context.lineWidth := 4;
  var R := 0.5 * Size - Context.lineWidth;
  Context.beginPath;
  Context.arc(0.5 * Size, 0.5 * Size, R, 0, 2 * Pi);
  Context.stroke;

  Context.beginPath;
  Context.moveTo(0.5 * Size, 0.5 * Size - 0.07 * R);
  Context.arc(0.5 * Size, 0.5 * Size, 0.05 * R, 0.3 - 0.5 * Pi, 2 * Pi - 0.3 - 0.5 * Pi);
  Context.ClosePath;
  Context.stroke;
end;


{ TGlyph }

constructor TGlyph.Create(Owner: IHtmlElementOwner; TrackName: String);
begin
  inherited Create(Owner);

  FName := TrackName;

  ImageElement.src := 'SVG\' + TrackName + '.svg';
  ImageElement.style.display := 'none';
end;


{ TMainScreen }

constructor TMainScreen.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);

  MainScreen := Self;
  DivElement.ID := 'main';

  // Create Header
  FHeader := THeader.Create(Self as IHtmlElementOwner);
  FHeader.FileSelect.OnLoad := lambda(Buffer: JArrayBuffer)
      LoadSofaFile(Buffer);
    end;

  FTextArea := TTextAreaElement.Create(Self as IHtmlElementOwner);
  FTextArea.TextAreaElement.Rows := 10;
  FTextArea.TextAreaElement.readOnly := True;
  FTextArea.TextAreaElement.placeholder := 'please load any SOFA file first';

  FPlane2D := TPlane2D.Create(Self as IHtmlElementOwner);
  FPlane2D.Resize;
  FPlane2D.CanvasElement.style.display := 'none';

  Window.addEventListener('resize', lambda
      FPlane2D.Resize;
    end);

  InitializeAudioEngine;

(*
  var Request := JXMLHttpRequest.Create;
  Request.onload := lambda
    LoadSofaFile(JArrayBuffer(Request.response));
    Result := nil;
  end;
  Request.responseType := 'arraybuffer';
  Request.open('GET', 'default.sofa', true);
  Request.send;
*)
end;

procedure TMainScreen.LoadSofaFile(Buffer: JArrayBuffer);
begin
  FSofaFile := sofaLoadFile(Buffer);
  PrintFileInformation;
  PrepareHrtfs;
end;

procedure TMainScreen.InitializeAudioEngine;
begin
  GAudioContext.sampleRate := 44100;

  for var TrackName in CTrackNames do
  begin
    var Track := TTrack.Create(TrackName, lambda(Sender: TObject) end);

    // loop track if it ends
    Track.OnEnded := lambda(Sender: TObject);
      TTrack(Sender).AudioBufferSource.Start(GAudioContext.currentTime);
    end;

    FTracks.Add(Track);
    FGlyphs.Add(TGlyph.Create(Self as IHtmlElementOwner, TrackName));
  end;
end;

procedure TMainScreen.PrintFileInformation;
begin
  FTextArea.Value := '';

  procedure PrintAttribute(Name: String);
  begin
    if FSofaFile.Attributes.has(Name) then
      if FSofaFile.Attributes.get(Name) <> '' then
        AddText(Name + ': ' + FSofaFile.Attributes.get(Name));
  end;

  PrintAttribute('Title');
  PrintAttribute('DataType');
  PrintAttribute('RoomType');
  PrintAttribute('RoomLocation');
  PrintAttribute('DateCreated');
  PrintAttribute('DateModified');
  PrintAttribute('APIName');
  PrintAttribute('APIVersion');
  PrintAttribute('AuthorContact');
  PrintAttribute('Organization');
  PrintAttribute('License');
  PrintAttribute('ApplicationName');
  PrintAttribute('Comment');
  PrintAttribute('History');
  PrintAttribute('References');
  PrintAttribute('Origin');

  AddText('');

  AddText('Number of Measurements: ' + IntToStr(FSofaFile.NumberOfMeasurements));
  AddText('Number of Receivers: ' + IntToStr(FSofaFile.NumberOfReceivers));
  AddText('Number of Emitters: ' + IntToStr(FSofaFile.NumberOfEmitters));
  AddText('Number of DataSamples: ' + IntToStr(FSofaFile.NumberOfDataSamples));
  AddText('SampleRate: ' + FloatToStr(FSofaFile.SampleRate[0]));
  AddText('Delay: ' + FloatToStr(FSofaFile.Delay[0]));
end;

procedure TMainScreen.AddText(Text: String);
begin
  FTextArea.Value := FTextArea.Value + Text + #13;
end;

procedure TMainScreen.PrepareHrtfs;
begin
  FHrtfs := THrtfs.Create(FSofaFile);
  RandomizeHrtfPositions;
end;

procedure TMainScreen.RandomizeHrtfPositions;
begin
  FPlane2D.Style.removeProperty('display');

  var StartTime := GAudioContext.currentTime;

  for var Track in FTracks do
  begin
    var Index := RandomInt(FHRTFs.MeasurementCount);
    var CurrentPosition := FHRTFs.Measurement[Index].Position;

    for var Glyph in FGlyphs do
    begin
      if Glyph.Name = Track.Text then
      begin
        var R := FPlane2D.CanvasElement.getBoundingClientRect;
        var Scale := Sqrt(Sqr(CurrentPosition[0]) + Sqr(CurrentPosition[1]));
        Glyph.Style.removeProperty('display');
        Glyph.Style.left := FloatToStr(R.left + 0.5 * R.width - 0.45 * CurrentPosition[1] / Scale * R.width - 16) + 'px';
        Glyph.Style.top := FloatToStr(R.top + 0.5 * R.height - 0.45 * CurrentPosition[0] / Scale * R.height - 16) + 'px';
      end;
    end;

    Track.FromHrtf(FHRTFs, Index);
    Track.AudioBufferSource.Start(StartTime);
  end;
end;

end.