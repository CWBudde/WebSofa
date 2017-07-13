unit Demo.Main;

interface

uses
  WHATWG.Console, WHATWG.XHR, ECMA.TypedArray, W3C.DOM4, W3C.Html5,
  Demo.Framework, HdfFile, SofaFile;

type
  THeader = class(TDivElement)
  private
  public
    procedure AfterConstructor; override;
  end;

  TFileSelect = class(TDivElement)
  private
    FInputFile: TInputFileElement;
  public
    procedure AfterConstructor; override;

    property InputFile: TInputFileElement read FInputFile;
  end;

  TArrayOfString = array of String;

  TMainScreen = class(TDivElement)
  private
    FHeader: THeader;
    FFileSelect: TFileSelect;
    FTextArea: TTextAreaElement;

    procedure AddText(Text: String);
    procedure LoadSofaFile(Buffer: JArrayBuffer);
    procedure PrintFileInformation(SofaFile: TSofaFile);
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;
  end;

var
  MainScreen: TMainScreen;

implementation

uses
  W3C.FileAPI, W3C.CSSOMView;

{ THeader }

procedure THeader.AfterConstructor;
begin
  var Heading := TH1Element.Create(Self as IHtmlElementOwner);
  Heading.Text := 'WebSofa Demo';
  Heading.Style.color := '#FFF';
  Heading.Style.TextShadow := '1px 1px 4px rgba(0,0,0,0.75)';
end;


{ TFileSelect }

procedure TFileSelect.AfterConstructor;
begin
  FInputFile := TInputFileElement.Create(Self as IHtmlElementOwner);
  FInputFile.InputElement.accept := '.sofa';
end;


{ TMainScreen }

constructor TMainScreen.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);

  MainScreen := Self;
  DivElement.ID := 'main';

  // Create Header
  FHeader := THeader.Create(Self as IHtmlElementOwner);

  FFileSelect := TFileSelect.Create(Self as IHtmlElementOwner);
  FFileSelect.InputFile.InputElement.addEventListener('change', lambda(Event: JEvent)
      var Files : JFileList = JFileList(Variant(Event.target).files);
      var Reader := JFileReader.Create;
      Reader.onload := lambda
        Console.Log('Loading file ' + JFile(Files[0]).name);
        LoadSofaFile(JArrayBuffer(Reader.result));
        Result := nil;
      end;
      Reader.readAsArrayBuffer(Files[0]);
    end);

  FTextArea := TTextAreaElement.Create(Self as IHtmlElementOwner);
  FTextArea.TextAreaElement.Rows := 24;
end;

procedure TMainScreen.LoadSofaFile(Buffer: JArrayBuffer);
begin
  var SofaFile := TSofaFile.Create;
  try
    SofaFile.LoadFromBuffer(Buffer);
    PrintFileInformation(SofaFile);
  finally
    SofaFile.Free;
  end;
end;

procedure TMainScreen.PrintFileInformation(SofaFile: TSofaFile);
begin
  FTextArea.Value := '';
  if SofaFile.Title <> '' then
    AddText('Title: ' + SofaFile.Title);
  if SofaFile.DataType <> '' then
    AddText('DataType: ' + SofaFile.DataType);
  if SofaFile.RoomType <> '' then
    AddText('RoomType: ' + SofaFile.RoomType);
  if SofaFile.DateCreated <> '' then
    AddText('DateCreated: ' + SofaFile.DateCreated);
  if SofaFile.DateModified <> '' then
    AddText('DateModified: ' + SofaFile.DateModified);
  if SofaFile.APIName <> '' then
    AddText('APIName: ' + SofaFile.APIName);
  if SofaFile.APIVersion <> '' then
    AddText('APIVersion: ' + SofaFile.APIVersion);
  if SofaFile.AuthorContact <> '' then
    AddText('AuthorContact: ' + SofaFile.AuthorContact);
  if SofaFile.Organization <> '' then
    AddText('Organization: ' + SofaFile.Organization);
  if SofaFile.License <> '' then
    AddText('License: ' + SofaFile.License);
  if SofaFile.ApplicationName <> '' then
    AddText('ApplicationName: ' + SofaFile.ApplicationName);
  if SofaFile.ApplicationVersion <> '' then
    AddText('ApplicationVersion: ' + SofaFile.ApplicationVersion);
  if SofaFile.Comment <> '' then
    AddText('Comment: ' + SofaFile.Comment);
  if SofaFile.History <> '' then
    AddText('History: ' + SofaFile.History);
  if SofaFile.References <> '' then
    AddText('References: ' + SofaFile.References);
  if SofaFile.Origin <> '' then
    AddText('Origin: ' + SofaFile.Origin);

  AddText('');

  AddText('Number of Measurements: ' + IntToStr(SofaFile.NumberOfMeasurements));
  AddText('Number of Receivers: ' + IntToStr(SofaFile.NumberOfReceivers));
  AddText('Number of Emitters: ' + IntToStr(SofaFile.NumberOfEmitters));
  AddText('Number of DataSamples: ' + IntToStr(SofaFile.NumberOfDataSamples));
  AddText('SampleRate: ' + FloatToStr(SofaFile.SampleRate[0]));
  AddText('Delay: ' + FloatToStr(SofaFile.Delay[0]));
end;

procedure TMainScreen.AddText(Text: String);
begin
  FTextArea.Value := FTextArea.Value + Text + #13;
end;

end.