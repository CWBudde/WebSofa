unit Demo.Framework;

interface

uses
  W3C.DOM4, W3C.HTML5, W3C.Canvas2DContext, W3C.CSSOM, W3C.SVG2;

type
  TVector2i = record
    X: Integer;
    Y: Integer;
    class function Create(const X, Y: Integer): TVector2i; static;
  end;

  TVector2f = record
    X: Float;
    Y: Float;
    class function Create(const X, Y: Float): TVector2f; static;
  end;

  IHtmlElementOwner = interface
    function GetHtmlElement: JHTMLElement;
    property HtmlElement: JHTMLElement read GetHtmlElement;
  end;

  THtmlElement = class;
  THtmlElementClass = class of THtmlElement;

  THtmlElement = class(IHtmlElementOwner)
  private
    function GetVisible: Boolean;
    procedure SetName(Value: String);
    procedure SetVisible(Value: Boolean);
  protected
    FOwner: IHtmlElementOwner;
    FName: String;
    FElement: JHTMLElement;
    class var Counter: Integer;
    function GetHtmlElement: JHTMLElement;
    class function ElementName: String; virtual; abstract;
    procedure NameChanged; virtual;
    procedure AfterConstructor; virtual; empty;

    property Element: JHTMLElement read FElement;
  public
    constructor Create(Owner: IHtmlElementOwner); overload; virtual;
    constructor Create(Element: JHTMLElement); overload; virtual;
    destructor Destroy; override;

    procedure Resize; virtual; empty;

    property Name: String read FName write SetName;
    property Visible: Boolean read GetVisible write SetVisible;
    property Style: JCSS2Properties read (JCSS2Properties(Element.Style));
    property Owner: IHtmlElementOwner read FOwner;
  end;

  TDivElement = class(THtmlElement)
  protected
    class function ElementName: String; override;
  public
    property DivElement: JHTMLDivElement read (JHTMLDivElement(Element));
  end;

  TButtonElement = class(THtmlElement)
  protected
    FTextNode: JText;
    class function ElementName: String; override;
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;

    property ButtonElement: JHTMLButtonElement read (JHTMLButtonElement(Element));
    property Text: string read (FTextNode.Data) write (FTextNode.Data);
  end;

  TParagraphElement = class(THtmlElement)
  private
    FTextNode: JText;
  protected
    class function ElementName: String; override;
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;

    property ParagraphElement: JHTMLParagraphElement read (JHTMLParagraphElement(Element));
    property Text: string read (FTextNode.Data) write (FTextNode.Data);
  end;

  TLinkElement = class(THtmlElement)
  private
    FTextNode: JText;
  protected
    class function ElementName: String; override;
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;

    property LinkElement: JHTMLLinkElement read (JHTMLLinkElement(Element));
    property Text: string read (FTextNode.Data) write (FTextNode.Data);
  end;

  TCustomHeadingElement = class(THtmlElement)
  private
    FTextNode: JText;
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;

    property HeadingElement: JHTMLHeadingElement read (JHTMLHeadingElement(Element));
    property Text: string read (FTextNode.Data) write (FTextNode.Data);
  end;

  TH1Element = class(TCustomHeadingElement)
  protected
    class function ElementName: String; override;
  end;

  TH2Element = class(TCustomHeadingElement)
  protected
    class function ElementName: String; override;
  end;

  TH3Element = class(TCustomHeadingElement)
  protected
    class function ElementName: String; override;
  end;

  TH4Element = class(TCustomHeadingElement)
  protected
    class function ElementName: String; override;
  end;

  TH5Element = class(TCustomHeadingElement)
  protected
    class function ElementName: String; override;
  end;

  TH6Element = class(TCustomHeadingElement)
  protected
    class function ElementName: String; override;
  end;

  TImageElement = class(THtmlElement)
  protected
    class function ElementName: String; override;
  public
    property ImageElement: JHTMLImageElement read (JHTMLImageElement(Element));
  end;

  TInputElement = class(THtmlElement)
  protected
    class function ElementName: String; override;
  public
    property InputElement: JHTMLInputElement read (JHTMLInputElement(Element));
    property Value: string read (InputElement.Value) write (InputElement.Value);
  end;

  TInputTextElement = class(TInputElement)
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;

    property Placeholder: String read (InputElement.Placeholder) write (InputElement.Placeholder);
  end;

  TInputPasswordElement = class(TInputElement)
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;

    property Placeholder: String read (InputElement.Placeholder) write (InputElement.Placeholder);
  end;

  TInputRadioElement = class(TInputElement)
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;
  end;

  TInputCheckBoxElement = class(TInputElement)
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;
  end;

  TInputRangeElement = class(TInputElement)
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;
  end;

  TInputFileElement = class(TInputElement)
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;
  end;

  TFieldSetElement = class(THtmlElement)
  protected
    class function ElementName: String; override;
  end;

  TTextAreaElement = class(THtmlElement)
  protected
    class function ElementName: String; override;
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;

    property TextAreaElement: JHTMLTextAreaElement read (JHTMLTextAreaElement(Element));
    property Value: string read (TextAreaElement.Value) write (TextAreaElement.Value);
  end;

  TLabelElement = class(THtmlElement)
  private
    FTextNode: JText;
  protected
    class function ElementName: String; override;
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;

    property LabelElement: JHTMLLabelElement read (JHTMLLabelElement(Element));
    property Text: string read (FTextNode.Data) write (FTextNode.Data);
  end;

  TCanvasElement = class(THtmlElement)
  protected
    class function ElementName: String; override;
  public
    property CanvasElement: JHTMLCanvasElement read (JHTMLCanvasElement(Element));
  end;

  TCanvas2DElement = class(TCanvasElement)
  private
    FContext: JCanvasRenderingContext2D;
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;

    property Context: JCanvasRenderingContext2D read FContext;
  end;

  TSvgElement = class(THtmlElement)
  protected
    class function ElementName: String; override;
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;

    property SvgElement: JSvgSvgElement read (JSvgSvgElement(Element));
  end;

  TOptionElement = class(THtmlElement)
  private
    FTextNode: JText;
  protected
    class function ElementName: String; override;
  public
    constructor Create(Owner: IHtmlElementOwner); overload; override;

    property OptionElement: JHTMLOptionElement read (JHTMLOptionElement(Element));
    property Text: string read (FTextNode.Data) write (FTextNode.Data);
  end;

  TSelectElement = class(THtmlElement)
  private
    FItems: array of TOptionElement;
  protected
    class function ElementName: String; override;
  public
    procedure AddItem(Text: String); overload;
    procedure AddItem(Text, ID: String); overload;
    procedure Clear;

    property SelectElement: JHTMLSelectElement read (JHTMLSelectElement(Element));
  end;

  TApplication = class(IHtmlElementOwner)
  private
    FPixelRatio: Float;
    FElements: array of THtmlElement;
    function GetHtmlElement: JHTMLElement;
  public
    constructor Create;
    destructor Destroy; override;

    procedure DeviceReady; virtual;
    procedure Pause; virtual; empty;
    procedure Resume; virtual; empty;

    function CreateElement(HtmlElementClass: THtmlElementClass): THtmlElement;
    procedure Run; empty;

    property PixelRatio: Float read FPixelRatio;
  end;

var
  Application: TApplication;
  CordovaAvailable: Boolean;

implementation

uses
  WHATWG.Console, W3C.CSSOM, Cordova.StatusBar;

{ TVector2i }

class function TVector2i.Create(const X, Y: Integer): TVector2i;
begin
  Result.X := X;
  Result.Y := Y;
end;


{ TVector2f }

class function TVector2f.Create(const X, Y: Float): TVector2f;
begin
  Result.X := X;
  Result.Y := Y;
end;


{ THtmlElement }

constructor THtmlElement.Create(Owner: IHtmlElementOwner);
var
  Classes: String;
begin
  FOwner := Owner;

  FElement := JHTMLElement(Document.createElement(ElementName));

  Owner.HtmlElement.appendChild(FElement);

  Classes := ClassName;
  var ParentClass := ClassParent;
  while Assigned(ParentClass) do
  begin
    if ParentClass.ClassName = 'TObject' then
      break;
    Classes += ' ' + ParentClass.ClassName;
    ParentClass := ParentClass.ClassParent;
  end;

  // specify element class
  FElement.setAttribute('class', Classes);

  Inc(Counter);
  FName := ElementName + IntToStr(Counter);

  // call after constructor
  AfterConstructor;
end;

constructor THtmlElement.Create(Element: JHTMLElement);
begin
  FOwner := nil;

  FElement := Element;

  Inc(Counter);
  FName := ElementName + IntToStr(Counter);

  // call after constructor
  AfterConstructor;
end;

destructor THtmlElement.Destroy;
begin
  //BeforeDestructor;
  FOwner.HtmlElement.removeChild(FElement);

  inherited;
end;

function THtmlElement.GetHtmlElement: JHTMLElement;
begin
  Result := FElement;
end;

function THtmlElement.GetVisible: Boolean;
begin
  Result := Element.style.getPropertyValue('visibility') = 'visible';
end;

procedure THtmlElement.SetName(Value: String);
begin
  if Name <> Value then
  begin
    FName := Value;
    NameChanged;
  end;
end;

procedure THtmlElement.SetVisible(Value: Boolean);
begin
  Element.style.setProperty('visibility', if Value then 'visible' else 'hidden');
end;

procedure THtmlElement.NameChanged;
begin
  FElement.id := Name;
end;


{ TDivElement }

class function TDivElement.ElementName: String;
begin
  Result := 'div';
end;


{ TButtonElement }

constructor TButtonElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);

  FTextNode := Document.createTextNode('');
  Element.appendChild(FTextNode);
end;

class function TButtonElement.ElementName: String;
begin
  Result := 'button';
end;


{ TParagraphElement }

constructor TParagraphElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);

  FTextNode := Document.createTextNode('');
  Element.appendChild(FTextNode);
end;

class function TParagraphElement.ElementName: String;
begin
  Result := 'p';
end;


{ TLinkElement }

constructor TLinkElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);

  FTextNode := Document.createTextNode('');
  Element.appendChild(FTextNode);
end;

class function TLinkElement.ElementName: String;
begin
  Result := 'a';
end;


{ TCustomHeadingElement }

constructor TCustomHeadingElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);

  FTextNode := Document.createTextNode('');
  Element.appendChild(FTextNode);
end;


{ TH1Element }

class function TH1Element.ElementName: String;
begin
  Result := 'H1';
end;


{ TH2Element }

class function TH2Element.ElementName: String;
begin
  Result := 'H2';
end;


{ TH3Element }

class function TH3Element.ElementName: String;
begin
  Result := 'H3';
end;


{ TH4Element }

class function TH4Element.ElementName: String;
begin
  Result := 'H4';
end;


{ TH5Element }

class function TH5Element.ElementName: String;
begin
  Result := 'H5';
end;


{ TH6Element }

class function TH6Element.ElementName: String;
begin
  Result := 'H6';
end;


{ TImageElement }

class function TImageElement.ElementName: String;
begin
  Result := 'img';
end;


{ TInputElement }

class function TInputElement.ElementName: String;
begin
  Result := 'input';
end;


{ TInputTextElement }

constructor TInputTextElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);
  InputElement.type := THTMLInputElementType.Text;
end;


{ TInputPasswordElement }

constructor TInputPasswordElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);
  InputElement.type := THTMLInputElementType.Password;
end;


{ TInputRadioElement }

constructor TInputRadioElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);
  InputElement.type := THTMLInputElementType.Radio;
end;


{ TInputCheckBoxElement }

constructor TInputCheckBoxElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);
  InputElement.type := THTMLInputElementType.CheckBox;
end;


{ TInputRangeElement }

constructor TInputRangeElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);
  InputElement.type := THTMLInputElementType.Range;
end;


{ TInputFileElement }

constructor TInputFileElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);
  InputElement.type := 'file';
end;


{ TTextAreaElement }

constructor TTextAreaElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);
end;

class function TTextAreaElement.ElementName: String;
begin
  Result := 'textarea';
end;


{ TFieldSetElement }

class function TFieldSetElement.ElementName: String;
begin
  Result := 'fieldset';
end;


{ TLabelElement }

constructor TLabelElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);

  FTextNode := Document.createTextNode('');
  Element.appendChild(FTextNode);
end;

class function TLabelElement.ElementName: String;
begin
  Result := 'label';
end;


{ TCanvasElement }

class function TCanvasElement.ElementName: String;
begin
  Result := 'canvas';
end;


{ TCanvas2DElement }

constructor TCanvas2DElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);

  FContext := JCanvasRenderingContext2D(CanvasElement.getContext('2d'));
end;


{ TSvgElement }

constructor TSvgElement.Create(Owner: IHtmlElementOwner);
var
  Classes: String;
begin
  FOwner := Owner;

  FElement := JHTMLElement(Document.createElementNS('http://www.w3.org/2000/svg', ElementName));

  Owner.HtmlElement.appendChild(FElement);

  Classes := ClassName;
  var ParentClass := ClassParent;
  while Assigned(ParentClass) do
  begin
    if ParentClass.ClassName = 'TObject' then
      break;
    Classes += ' ' + ParentClass.ClassName;
    ParentClass := ParentClass.ClassParent;
  end;

  // specify element class
  FElement.setAttribute('class', Classes);

  Inc(Counter);
  FName := ElementName + IntToStr(Counter);

  // call after constructor
  AfterConstructor;
end;

class function TSvgElement.ElementName: String;
begin
  Result := 'svg';
end;

{ TOptionElement }

constructor TOptionElement.Create(Owner: IHtmlElementOwner);
begin
  inherited Create(Owner);

  FTextNode := Document.createTextNode('');
  Element.appendChild(FTextNode);
end;

class function TOptionElement.ElementName: String;
begin
  Result := 'option';
end;


{ TSelectElement }

class function TSelectElement.ElementName: String;
begin
  Result := 'select';
end;

procedure TSelectElement.Clear;
begin
  while FItems.Count > 0 do
  begin
    FItems[0].Free;
    FItems.Delete(0);
  end;
end;

procedure TSelectElement.AddItem(Text: String);
begin
  var Item := TOptionElement.Create(Self as IHtmlElementOwner);
  Item.Text := Text;

  FItems.Add(Item);
end;

procedure TSelectElement.AddItem(Text, ID: String);
begin
  var Item := TOptionElement.Create(Self as IHtmlElementOwner);
  Item.Text := Text;
  Item.OptionElement.id := ID;

  FItems.Add(Item);
end;


{ TApplication }

constructor TApplication.Create;
begin
  // add cordova events
  Document.addEventListener('deviceready', @DeviceReady);

  // determine pixel ratio
  FPixelRatio := 1;
  asm
    @FPixelRatio = window.devicePixelRatio || 1;
  end;
end;

destructor TApplication.Destroy;
begin
  inherited;
end;

function TApplication.GetHtmlElement: JHTMLElement;
begin
  Result := Document.Body;
end;

function TApplication.CreateElement(HtmlElementClass: THtmlElementClass): THtmlElement;
begin
  Result := HtmlElementClass.Create(Self as IHtmlElementOwner);
  FElements.Add(Result);
end;

procedure TApplication.DeviceReady;
begin
  {$IFDEF DEBUG} Console.Log('Cordova is ready!'); {$ENDIF}

  // add cordova events
  Document.addEventListener('pause', @Pause);
  Document.addEventListener('resume', @Resume);

  {$IFDEF iOS}
  // try to hide status bar
  if Assigned(StatusBar) then
    StatusBar.hide;
  {$ENDIF}

  CordovaAvailable := True;
end;

initialization
  Application := TApplication.Create;

end.