unit Demo.Audio;

interface

uses
  ECMA.TypedArray, W3C.DOM4, W3C.Html5, W3C.WebAudio, Demo.Framework, Demo.Hrtf;

type
  TNotifyEvent = procedure(Sender: TObject);

  TTrack = class
  private
    FAudioBuffer: JAudioBuffer;
    FAudioBufferSource: JAudioBufferSourceNode;
    FConvolverNode: JConvolverNode;
    FText: String;
    FHrtfIndex: Integer;
    FOnReady: TNotifyEvent;
    FOnEnded: TNotifyEvent;
    procedure RequestAudio;
    procedure SetupAudioBufferNode;
  public
    constructor Create(Text: String; OnReady: TNotifyEvent);

    procedure FromHrtf(Hrtfs: THrtfs; Index: Integer);

    property Text: String read FText;
    property HrtfIndex: Integer read FHrtfIndex;
    property AudioBufferSource: JAudioBufferSourceNode read FAudioBufferSource;

    property OnEnded: TNotifyEvent read FOnEnded write FOnEnded;
  end;

var
  GAudioContext external 'AudioContext': JAudioContext;

implementation

uses
  WHATWG.Console, WHATWG.XHR;

{ TTrack }

constructor TTrack.Create(Text: String; OnReady: TNotifyEvent);
begin
  FText := Text;
  FOnReady := OnReady;

  // create convolver node
  FConvolverNode := GAudioContext.createConvolver;
  FConvolverNode.normalize := false;
  FConvolverNode.connect(GAudioContext.destination);

  RequestAudio;
end;

procedure TTrack.RequestAudio;
begin
  var Request := new JXMLHttpRequest;
  Request.open('GET', 'Audio\' + FText + '.wav', True);
  Request.responseType := 'arraybuffer';
  Request.OnLoad := lambda
    if Assigned(GAudioContext) then
    begin
      GAudioContext.decodeAudioData(JArrayBuffer(Request.response),
        lambda(DecodedData: JAudioBuffer)
          FAudioBuffer := DecodedData;
          SetupAudioBufferNode;
          if Assigned(FOnReady) then
            FOnReady(Self);
        end,
        lambda(error: JDOMException)
          Console.Log('Error loading file ' + Text);
        end);
    end
    else
      Result := False;
  end;
  Request.OnError := lambda
    Console.Log('Error loading file!');
    Result := False;
  end;
  Request.send;
end;

procedure TTrack.FromHrtf(Hrtfs: THrtfs; Index: Integer);
begin
  var HrtfBuffer := GAudioContext.createBuffer(2, Hrtfs.SampleFrames, GAudioContext.SampleRate);

  HrtfBuffer.copyToChannel(Hrtfs.Measurement[Index].Left, 0);
  HrtfBuffer.copyToChannel(Hrtfs.Measurement[Index].Right, 1);

  FHrtfIndex := Index;

  if GAudioContext.SampleRate <> Hrtfs.SampleRate then
  begin
    var OfflineAudioContext: JOfflineAudioContext;

    asm
      var OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      @OfflineAudioContext = new OfflineAudioContext(2, @Hrtfs.FSampleFrames, @GAudioContext.sampleRate);
    end;

    var Buffer := GAudioContext.createBuffer(2, Hrtfs.SampleFrames, GAudioContext.SampleRate);

    var BufferSource = OfflineAudioContext.createBufferSource;
    BufferSource.buffer := HrtfBuffer;
    BufferSource.connect(OfflineAudioContext.destination);
    BufferSource.start(0);

    OfflineAudioContext.oncomplete := lambda(Event: JEvent)
      var OfflineAudioEvent := JOfflineAudioCompletionEvent(Event);
      HrtfBuffer := OfflineAudioEvent.renderedBuffer;
      Result := False;
    end;

    OfflineAudioContext.startRendering;
  end;

  Assert(HrtfBuffer.sampleRate = GAudioContext.SampleRate);

  FConvolverNode.buffer := HrtfBuffer;
end;

procedure TTrack.SetupAudioBufferNode;
begin
  FAudioBufferSource := GAudioContext.createBufferSource;
  FAudioBufferSource.buffer := FAudioBuffer;
  FAudioBufferSource.connect(FConvolverNode);
  FAudioBufferSource.onended := lambda
    SetupAudioBufferNode;

    if Assigned(FOnEnded) then
      FOnEnded(Self);

    Result := False;
  end;
end;

initialization

  asm
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    @GAudioContext = new AudioContext();
  end;

end.