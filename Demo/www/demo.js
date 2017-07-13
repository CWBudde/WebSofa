function Trim$_String_(s) { return s.replace(/^\s\s*/, "").replace(/\s\s*$/, "") }
var TObject={
	$ClassName: "TObject",
	$Parent: null,
	ClassName: function (s) { return s.$ClassName },
	ClassType: function (s) { return s },
	ClassParent: function (s) { return s.$Parent },
	$Init: function (s) {},
	Create: function (s) { return s },
	Destroy: function (s) { for (var prop in s) if (s.hasOwnProperty(prop)) delete s[prop] },
	Destroy$: function(s) { return s.ClassType.Destroy(s) },
	Free: function (s) { if (s!==null) s.ClassType.Destroy(s) }
}
function StrDeleteRight(s,n) { return s.substr(0, s.length-n) }
function SetLength(s,n) { if (s.v.length>n) s.v=s.v.substring(0,n);else while (s.v.length<n) s.v+=" "; }
function Log2(x) { return Math.log(x)/Math.LN2 }
var Exception={
	$ClassName: "Exception",
	$Parent: TObject,
	$Init: function (s) { FMessage="" },
	Create: function (s,Msg) { s.FMessage=Msg; return s }
}
var EAssertionFailed={
	$ClassName: "EAssertionFailed",
	$Parent: Exception,
	$Init: Exception.$Init
}
function Delete(s,i,n) { var v=s.v; if ((i<=0)||(i>v.length)||(n<=0)) return; s.v=v.substr(0,i-1)+v.substr(i+n-1); }
function Chr(c) {
	if (c<=0xFFFF)
		return String.fromCharCode(c);
	c-=0x10000;
	return String.fromCharCode(0xD800+(c>>10))+String.fromCharCode(0xDC00+(c&0x3FF));
}
function $NewDyn(c,z) {
	if (c==null) throw Exception.Create($New(Exception),"ClassType is nil"+z);
	var i={ClassType:c};
	c.$Init(i);
	return i
}
function $New(c) { var i={ClassType:c}; c.$Init(i); return i }
function $Event0(i,f) {
	var li=i,lf=f;
	return function() {
		return lf.call(li,li)
	}
}
function $Div(a,b) { var r=a/b; return (r>=0)?Math.floor(r):Math.ceil(r) }
function $Assert(b,m,z) { if (!b) throw Exception.Create($New(EAssertionFailed),"Assertion failed"+z+((m=="")?"":" : ")+m); }
function $AsIntf(o,i) {
	if (o===null) return null;
	var r = o.ClassType.$Intf[i].map(function (e) {
		return function () {
			var arg=Array.prototype.slice.call(arguments);
			arg.splice(0,0,o);
			return e.apply(o, arg);
		}
	});
	r.O = o;
	return r;
}
;
function $ArraySetLenC(a,n,d) {
	var o=a.length;
	if (o==n) return;
	if (o>n) a.length=n; else for (;o<n;o++) a.push(d());
}
function $ArraySetLen(a,n,v) {
	var o=a.length;
	if (o==n) return;
	if (o>n) a.length=n; else for (;o<n;o++) a.push(v);
}
var THtmlElement = {
   $ClassName:"THtmlElement",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FElement = $.FOwner = null;
      $.FName = "";
   }
   ,a$1:function(Self) {
      return Self.FElement.style;
   }
   ,AfterConstructor:function(Self) {
      /* null */
   }
   ,Create$159:function(Self, Element$3) {
      Self.FOwner = null;
      Self.FElement = Element$3;
      ++Counter;
      Self.FName = THtmlElement.ElementName$(Self.ClassType)+Counter.toString();
      THtmlElement.AfterConstructor$(Self);
      return Self
   }
   ,Create$158:function(Self, Owner$1) {
      var Classes = "";
      var ParentClass = null;
      Self.FOwner = Owner$1;
      Self.FElement = document.createElement(THtmlElement.ElementName$(Self.ClassType));
      Owner$1[0]().appendChild(Self.FElement);
      Classes = TObject.ClassName(Self.ClassType);
      ParentClass = TObject.ClassParent(Self.ClassType);
      while (ParentClass!==null) {
         if (TObject.ClassName(ParentClass)=="TObject") {
            break;
         }
         Classes+=" "+TObject.ClassName(ParentClass);
         ParentClass = TObject.ClassParent(ParentClass);
      }
      Self.FElement.setAttribute("class",Classes);
      ++Counter;
      Self.FName = THtmlElement.ElementName$(Self.ClassType)+Counter.toString();
      THtmlElement.AfterConstructor$(Self);
      return Self
   }
   ,Destroy:function(Self) {
      Self.FOwner[0]().removeChild(Self.FElement);
      TObject.Destroy(Self);
   }
   ,GetHtmlElement:function(Self) {
      return Self.FElement;
   }
   ,NameChanged:function(Self) {
      Self.FElement.id = Self.FName;
   }
   ,SetName:function(Self, Value$2) {
      if (Self.FName!=Value$2) {
         Self.FName = Value$2;
         THtmlElement.NameChanged(Self);
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AfterConstructor$:function($){return $.ClassType.AfterConstructor($)}
   ,Create$158$:function($){return $.ClassType.Create$158.apply($.ClassType, arguments)}
   ,ElementName$:function($){return $.ElementName($)}
};
THtmlElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TDivElement = {
   $ClassName:"TDivElement",$Parent:THtmlElement
   ,$Init:function ($) {
      THtmlElement.$Init($);
   }
   ,ElementName:function(Self) {
      return "div";
   }
   ,a$30:function(Self) {
      return Self.FElement;
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158:THtmlElement.Create$158
   ,ElementName$:function($){return $.ElementName($)}
};
TDivElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TMainScreen = {
   $ClassName:"TMainScreen",$Parent:TDivElement
   ,$Init:function ($) {
      TDivElement.$Init($);
      $.FFileSelect = $.FHeader = $.FTextArea = null;
   }
   ,AddText:function(Self, Text$7) {
      TTextAreaElement.a$2(Self.FTextArea,TTextAreaElement.a$3(Self.FTextArea)+Text$7+"\r");
   }
   ,Create$158:function(Self, Owner$2) {
      THtmlElement.Create$158(Self,Owner$2);
      MainScreen = Self;
      TDivElement.a$30(Self).id = "main";
      Self.FHeader = THtmlElement.Create$158$($New(THeader),$AsIntf(Self,"IHtmlElementOwner"));
      Self.FFileSelect = THtmlElement.Create$158$($New(TFileSelect),$AsIntf(Self,"IHtmlElementOwner"));
      TInputElement.a$21(Self.FFileSelect.FInputFile).addEventListener("change",function (Event) {
         var Files = null,
            Reader = null;
         Files = Event.target.files;
         Reader = new FileReader();
         Reader.onload = function (_implicit_event) {
            var Result = undefined;
            console.log("Loading file "+Files[0].name);
            TMainScreen.LoadSofaFile(Self,Reader.result);
            Result = null;
            return Result
         };
         Reader.readAsArrayBuffer(Files[0]);
      },false);
      Self.FTextArea = THtmlElement.Create$158$($New(TTextAreaElement),$AsIntf(Self,"IHtmlElementOwner"));
      TTextAreaElement.a$4(Self.FTextArea).rows = 24;
      return Self
   }
   ,LoadSofaFile:function(Self, Buffer) {
      var SofaFile = null;
      SofaFile = TObject.Create($New(TSofaFile));
      try {
         TSofaFile.LoadFromBuffer(SofaFile,Buffer);
         TMainScreen.PrintFileInformation(Self,SofaFile);
      } finally {
         TObject.Free(SofaFile);
      }
   }
   ,PrintFileInformation:function(Self, SofaFile$1) {
      TTextAreaElement.a$2(Self.FTextArea,"");
      if (SofaFile$1.FTitle!="") {
         TMainScreen.AddText(Self,"Title: "+SofaFile$1.FTitle);
      }
      if (SofaFile$1.FDataType!="") {
         TMainScreen.AddText(Self,"DataType: "+SofaFile$1.FDataType);
      }
      if (SofaFile$1.FRoomType!="") {
         TMainScreen.AddText(Self,"RoomType: "+SofaFile$1.FRoomType);
      }
      if (SofaFile$1.FDateCreated!="") {
         TMainScreen.AddText(Self,"DateCreated: "+SofaFile$1.FDateCreated);
      }
      if (SofaFile$1.FDateModified!="") {
         TMainScreen.AddText(Self,"DateModified: "+SofaFile$1.FDateModified);
      }
      if (SofaFile$1.FAPIName!="") {
         TMainScreen.AddText(Self,"APIName: "+SofaFile$1.FAPIName);
      }
      if (SofaFile$1.FAPIVersion!="") {
         TMainScreen.AddText(Self,"APIVersion: "+SofaFile$1.FAPIVersion);
      }
      if (SofaFile$1.FAuthorContact!="") {
         TMainScreen.AddText(Self,"AuthorContact: "+SofaFile$1.FAuthorContact);
      }
      if (SofaFile$1.FOrganization!="") {
         TMainScreen.AddText(Self,"Organization: "+SofaFile$1.FOrganization);
      }
      if (SofaFile$1.FLicense!="") {
         TMainScreen.AddText(Self,"License: "+SofaFile$1.FLicense);
      }
      if (SofaFile$1.FApplicationName!="") {
         TMainScreen.AddText(Self,"ApplicationName: "+SofaFile$1.FApplicationName);
      }
      if (SofaFile$1.FApplicationVersion!="") {
         TMainScreen.AddText(Self,"ApplicationVersion: "+SofaFile$1.FApplicationVersion);
      }
      if (SofaFile$1.FComment!="") {
         TMainScreen.AddText(Self,"Comment: "+SofaFile$1.FComment);
      }
      if (SofaFile$1.FHistory!="") {
         TMainScreen.AddText(Self,"History: "+SofaFile$1.FHistory);
      }
      if (SofaFile$1.FReferences!="") {
         TMainScreen.AddText(Self,"References: "+SofaFile$1.FReferences);
      }
      if (SofaFile$1.FOrigin!="") {
         TMainScreen.AddText(Self,"Origin: "+SofaFile$1.FOrigin);
      }
      TMainScreen.AddText(Self,"");
      TMainScreen.AddText(Self,"Number of Measurements: "+SofaFile$1.FNumberOfMeasurements.toString());
      TMainScreen.AddText(Self,"Number of Receivers: "+SofaFile$1.FNumberOfReceivers.toString());
      TMainScreen.AddText(Self,"Number of Emitters: "+SofaFile$1.FNumberOfEmitters.toString());
      TMainScreen.AddText(Self,"Number of DataSamples: "+SofaFile$1.FNumberOfDataSamples.toString());
      TMainScreen.AddText(Self,"SampleRate: "+TSofaFile.GetSampleRate(SofaFile$1,0).toString());
      TMainScreen.AddText(Self,"Delay: "+TSofaFile.GetDelay(SofaFile$1,0).toString());
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158$:function($){return $.ClassType.Create$158.apply($.ClassType, arguments)}
   ,ElementName:TDivElement.ElementName
};
TMainScreen.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var THeader = {
   $ClassName:"THeader",$Parent:TDivElement
   ,$Init:function ($) {
      TDivElement.$Init($);
   }
   ,AfterConstructor:function(Self) {
      var Heading = null;
      Heading = THtmlElement.Create$158$($New(TH1Element),$AsIntf(Self,"IHtmlElementOwner"));
      TCustomHeadingElement.a$27(Heading,"WebSofa Demo");
      THtmlElement.a$1(Heading).color = "#FFF";
      THtmlElement.a$1(Heading).textShadow = "1px 1px 4px rgba(0,0,0,0.75)";
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor$:function($){return $.ClassType.AfterConstructor($)}
   ,Create$158:THtmlElement.Create$158
   ,ElementName:TDivElement.ElementName
};
THeader.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TFileSelect = {
   $ClassName:"TFileSelect",$Parent:TDivElement
   ,$Init:function ($) {
      TDivElement.$Init($);
      $.FInputFile = null;
   }
   ,AfterConstructor:function(Self) {
      Self.FInputFile = THtmlElement.Create$158$($New(TInputFileElement),$AsIntf(Self,"IHtmlElementOwner"));
      TInputElement.a$21(Self.FInputFile).accept = ".sofa";
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor$:function($){return $.ClassType.AfterConstructor($)}
   ,Create$158:THtmlElement.Create$158
   ,ElementName:TDivElement.ElementName
};
TFileSelect.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TTextAreaElement = {
   $ClassName:"TTextAreaElement",$Parent:THtmlElement
   ,$Init:function ($) {
      THtmlElement.$Init($);
   }
   ,a$4:function(Self) {
      return Self.FElement;
   }
   ,a$3:function(Self) {
      return TTextAreaElement.a$4(Self).value;
   }
   ,a$2:function(Self, Value$3) {
      TTextAreaElement.a$4(Self).value = Value$3;
   }
   ,Create$158:function(Self, Owner$3) {
      THtmlElement.Create$158(Self,Owner$3);
      return Self
   }
   ,ElementName:function(Self) {
      return "textarea";
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158$:function($){return $.ClassType.Create$158.apply($.ClassType, arguments)}
   ,ElementName$:function($){return $.ElementName($)}
};
TTextAreaElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TInputElement = {
   $ClassName:"TInputElement",$Parent:THtmlElement
   ,$Init:function ($) {
      THtmlElement.$Init($);
   }
   ,ElementName:function(Self) {
      return "input";
   }
   ,a$21:function(Self) {
      return Self.FElement;
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158:THtmlElement.Create$158
   ,ElementName$:function($){return $.ElementName($)}
};
TInputElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TInputFileElement = {
   $ClassName:"TInputFileElement",$Parent:TInputElement
   ,$Init:function ($) {
      TInputElement.$Init($);
   }
   ,Create$158:function(Self, Owner$4) {
      THtmlElement.Create$158(Self,Owner$4);
      TInputElement.a$21(Self).type = "file";
      return Self
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158$:function($){return $.ClassType.Create$158.apply($.ClassType, arguments)}
   ,ElementName:TInputElement.ElementName
};
TInputFileElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TCustomHeadingElement = {
   $ClassName:"TCustomHeadingElement",$Parent:THtmlElement
   ,$Init:function ($) {
      THtmlElement.$Init($);
      $.FTextNode$4 = null;
   }
   ,a$28:function(Self) {
      return Self.FTextNode$4.data;
   }
   ,a$27:function(Self, Value$4) {
      Self.FTextNode$4.data = Value$4;
   }
   ,Create$158:function(Self, Owner$5) {
      THtmlElement.Create$158(Self,Owner$5);
      Self.FTextNode$4 = document.createTextNode("");
      Self.FElement.appendChild(Self.FTextNode$4);
      return Self
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158$:function($){return $.ClassType.Create$158.apply($.ClassType, arguments)}
   ,ElementName:THtmlElement.ElementName
};
TCustomHeadingElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TH1Element = {
   $ClassName:"TH1Element",$Parent:TCustomHeadingElement
   ,$Init:function ($) {
      TCustomHeadingElement.$Init($);
   }
   ,ElementName:function(Self) {
      return "H1";
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158:TCustomHeadingElement.Create$158
   ,ElementName$:function($){return $.ElementName($)}
};
TH1Element.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TApplication = {
   $ClassName:"TApplication",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FElements = [];
   }
   ,Create$175:function(Self) {
      document.addEventListener("deviceready",$Event0(Self,TApplication.DeviceReady),false);
      return Self
   }
   ,CreateElement:function(Self, HtmlElementClass) {
      var Result = null;
      Result = THtmlElement.Create$158$($NewDyn(HtmlElementClass,""),$AsIntf(Self,"IHtmlElementOwner"));
      Self.FElements.push(Result);
      return Result
   }
   ,Destroy:function(Self) {
      TObject.Destroy(Self);
   }
   ,DeviceReady:function(Self) {
      document.addEventListener("pause",$Event0(Self,TApplication.Pause),false);
      document.addEventListener("resume",$Event0(Self,TApplication.Resume),false);
      CordovaAvailable = true;
   }
   ,GetHtmlElement$1:function(Self) {
      return document.body;
   }
   ,Pause:function(Self) {
      /* null */
   }
   ,Resume:function(Self) {
      /* null */
   }
   ,Run:function(Self) {
      /* null */
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
TApplication.$Intf={
   IHtmlElementOwner:[TApplication.GetHtmlElement$1]
}
var TStream = {
   $ClassName:"TStream",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FDataView = null;
      $.FPosition = 0;
   }
   ,a$35:function(Self) {
      return Self.FDataView.buffer.byteLength;
   }
   ,Clear$1:function(Self) {
      Self.FPosition = 0;
   }
   ,Create$255:function(Self, Buffer$1) {
      Self.FPosition = 0;
      Self.FDataView = new DataView(Buffer$1);
      return Self
   }
   ,ReadBufferExcept:function(Self, Count) {
      var Result = null;
      if (Self.FPosition+Count>Self.FDataView.byteLength) {
         throw Exception.Create($New(Exception),"Position exceeds byte length");
      }
      Result = new Uint8Array(Self.FDataView.buffer.slice(Self.FPosition,Self.FPosition+Count));
      (Self.FPosition+= Count);
      return Result
   }
   ,ReadFloat:function(Self, Count$1) {
      var Result = 0;
      if (Self.FPosition+Count$1>Self.FDataView.byteLength) {
         throw Exception.Create($New(Exception),"Position exceeds byte length");
      }
      switch (Count$1) {
         case 4 :
            Result = Self.FDataView.getFloat32(Self.FPosition,true);
            break;
         case 8 :
            Result = Self.FDataView.getFloat64(Self.FPosition,true);
            break;
         default :
            throw Exception.Create($New(Exception),"Unknown bit width");
      }
      (Self.FPosition+= Count$1);
      return Result
   }
   ,ReadIntegerExcept:function(Self, Count$2) {
      var Result = 0;
      if (Self.FPosition+Count$2>Self.FDataView.byteLength) {
         throw Exception.Create($New(Exception),"Position exceeds byte length");
      }
      switch (Count$2) {
         case 1 :
            Result = Self.FDataView.getUint8(Self.FPosition);
            break;
         case 2 :
            Result = Self.FDataView.getUint16(Self.FPosition,true);
            break;
         case 3 :
            Result = Self.FDataView.getUint16(Self.FPosition,true)+(Self.FDataView.getUint8(Self.FPosition+2)<<16);
            break;
         case 4 :
            Result = Self.FDataView.getUint32(Self.FPosition,true);
            break;
         case 5 :
            Result = Self.FDataView.getUint32(Self.FPosition,true)|(Self.FDataView.getUint8(Self.FPosition+4)<<32);
            break;
         case 6 :
            Result = Self.FDataView.getUint32(Self.FPosition,true)|(Self.FDataView.getUint16(Self.FPosition+4,true)<<32);
            break;
         case 8 :
            Result = Self.FDataView.getUint32(Self.FPosition,true)|(Self.FDataView.getUint32(Self.FPosition+4,true)<<32);
            break;
         default :
            throw Exception.Create($New(Exception),"Unknown bit width");
      }
      (Self.FPosition+= Count$2);
      return Result
   }
   ,ReadStringExcept:function(Self, Count$3) {
      var Result = "";
      var Decoder = null;
      if (Self.FPosition+Count$3>Self.FDataView.byteLength) {
         throw Exception.Create($New(Exception),"Position exceeds byte length");
      }
      Decoder = new TextDecoder();
      Result = Decoder.decode(Self.FDataView.buffer.slice(Self.FPosition,Self.FPosition+Count$3));
      if (!Result.charCodeAt(Result.length-1)) {
         Result = StrDeleteRight(Result,1);
      }
      (Self.FPosition+= Count$3);
      return Result
   }
   ,Seek:function(Self, Position$1, IsRelative) {
      var Result = 0;
      Self.FPosition = Position$1+((IsRelative)?Self.FPosition:0);
      if (Self.FPosition>Self.FDataView.byteLength) {
         Self.FPosition = Self.FDataView.byteLength;
      }
      if (Self.FPosition>Self.FDataView.byteLength) {
         throw Exception.Create($New(Exception),"Invalid Position");
      }
      Result = Self.FPosition;
      return Result
   }
   ,WriteBuffer:function(Self, Buffer$2) {
      var OldBuffer = null,
         NewBuffer = null;
      OldBuffer = Self.FDataView.buffer;
      NewBuffer = new Uint8Array(OldBuffer.byteLength+Buffer$2.byteLength);
      NewBuffer.set(OldBuffer,0);
      NewBuffer.set(Buffer$2,OldBuffer.byteLength);
      Self.FDataView = new DataView(NewBuffer.buffer);
      Self.FPosition = NewBuffer.byteLength;
   }
   ,WriteInteger:function(Self, Count$4, Value$5) {
      switch (Count$4) {
         case 1 :
            Self.FDataView.setUint8(Self.FPosition,Value$5);
            break;
         case 2 :
            Self.FDataView.setUint16(Self.FPosition,Value$5);
            break;
         case 4 :
            Self.FDataView.setUint32(Self.FPosition,Value$5);
            break;
         default :
            throw Exception.Create($New(Exception),"Invalid count");
      }
      (Self.FPosition+= Count$4);
   }
   ,WriteString:function(Self, Value$6) {
      var Encoder = null;
      Encoder = new TextEncoder();
      TStream.WriteBuffer(Self,Encoder.encode(Value$6));
   }
   ,Destroy:TObject.Destroy
};
var THdfSuperBlock = {
   $ClassName:"THdfSuperBlock",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBaseAddress = $.FChecksum = $.FConsistencyFlag = $.FEndOfFileAddress = $.FLengthsSize = $.FOffsetSize = $.FRootGroupObjectHeaderAddress = $.FSuperBlockExtensionAddress = $.FVersion = 0;
      $.FFormatSignature = "";
   }
   ,LoadFromStream:function(Self, Stream) {
      var Identifier = 0,
         FormatSignatureVersion = 0;
      Identifier = TStream.ReadIntegerExcept(Stream,1);
      if (Identifier!=137) {
         throw Exception.Create($New(Exception),"The file is not a valid HDF");
      }
      Self.FFormatSignature = TStream.ReadStringExcept(Stream,3);
      if (Self.FFormatSignature!="HDF") {
         throw Exception.Create($New(Exception),"The file is not a valid HDF");
      }
      FormatSignatureVersion = TStream.ReadIntegerExcept(Stream,4);
      if (FormatSignatureVersion!=169478669) {
         throw Exception.Create($New(Exception),"The file is not a valid HDF");
      }
      Self.FVersion = TStream.ReadIntegerExcept(Stream,1);
      if (!((Self.FVersion==2||Self.FVersion==3))) {
         throw Exception.Create($New(Exception),"Unsupported version");
      }
      Self.FOffsetSize = TStream.ReadIntegerExcept(Stream,1);
      Self.FLengthsSize = TStream.ReadIntegerExcept(Stream,1);
      Self.FConsistencyFlag = TStream.ReadIntegerExcept(Stream,1);
      Self.FBaseAddress = TStream.ReadIntegerExcept(Stream,Self.FOffsetSize);
      Self.FSuperBlockExtensionAddress = TStream.ReadIntegerExcept(Stream,Self.FOffsetSize);
      Self.FEndOfFileAddress = TStream.ReadIntegerExcept(Stream,Self.FOffsetSize);
      Self.FRootGroupObjectHeaderAddress = TStream.ReadIntegerExcept(Stream,Self.FOffsetSize);
      if (Self.FBaseAddress) {
         throw Exception.Create($New(Exception),"The base address should be zero");
      }
      if (Self.FEndOfFileAddress!=TStream.a$35(Stream)) {
         throw Exception.Create($New(Exception),"Size mismatch");
      }
      Self.FChecksum = TStream.ReadIntegerExcept(Stream,4);
      if (TStream.Seek(Stream,Self.FRootGroupObjectHeaderAddress,false)!=Self.FRootGroupObjectHeaderAddress) {
         throw Exception.Create($New(Exception),"Error seeking first object");
      }
   }
   ,Destroy:TObject.Destroy
};
var THdfDataObjectMessage = {
   $ClassName:"THdfDataObjectMessage",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FDataObject = $.FSuperBlock = null;
      $.FVersion$1 = 0;
   }
   ,Create$256:function(Self, SuperBlock$3, DataObject$3) {
      Self.FSuperBlock = SuperBlock$3;
      Self.FDataObject = DataObject$3;
      return Self
   }
   ,LoadFromStream$1:function(Self, Stream$1) {
      Self.FVersion$1 = TStream.ReadIntegerExcept(Stream$1,1);
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$1$:function($){return $.ClassType.LoadFromStream$1.apply($.ClassType, arguments)}
};
var THdfMessageLinkInfo = {
   $ClassName:"THdfMessageLinkInfo",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FAddressBTreeIndex = $.FAddressBTreeOrder = $.FFlags = $.FFractalHeapAddress = $.FMaximumCreationIndex = 0;
   }
   ,LoadFromStream$1:function(Self, Stream$2) {
      THdfDataObjectMessage.LoadFromStream$1(Self,Stream$2);
      if (Self.FVersion$1) {
         throw Exception.Create($New(Exception),"Unsupported version of link info message");
      }
      Self.FFlags = TStream.ReadIntegerExcept(Stream$2,1);
      if (Self.FFlags&1) {
         Self.FMaximumCreationIndex = TStream.ReadIntegerExcept(Stream$2,8);
      }
      Self.FFractalHeapAddress = TStream.ReadIntegerExcept(Stream$2,Self.FSuperBlock.FOffsetSize);
      Self.FAddressBTreeIndex = TStream.ReadIntegerExcept(Stream$2,Self.FSuperBlock.FOffsetSize);
      if (Self.FFlags&2) {
         Self.FAddressBTreeOrder = TStream.ReadIntegerExcept(Stream$2,Self.FSuperBlock.FOffsetSize);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$1$:function($){return $.ClassType.LoadFromStream$1.apply($.ClassType, arguments)}
};
var THdfMessageHeaderContinuation = {
   $ClassName:"THdfMessageHeaderContinuation",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FOffset = $.FLength = 0;
   }
   ,LoadFromStream$1:function(Self, Stream$3) {
      var StreamPos = 0;
      var Signature = "";
      Self.FOffset = TStream.ReadIntegerExcept(Stream$3,Self.FSuperBlock.FOffsetSize);
      Self.FLength = TStream.ReadIntegerExcept(Stream$3,Self.FSuperBlock.FLengthsSize);
      StreamPos = Stream$3.FPosition;
      Stream$3.FPosition = Self.FOffset;
      Signature = TStream.ReadStringExcept(Stream$3,4);
      if (Signature!="OCHK") {
         throw Exception.Create($New(Exception),("Wrong signature ("+Signature.toString()+")"));
      }
      THdfDataObject.ReadObjectHeaderMessages(Self.FDataObject,Stream$3,Self.FOffset+Self.FLength);
      Stream$3.FPosition = StreamPos;
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$1$:function($){return $.ClassType.LoadFromStream$1.apply($.ClassType, arguments)}
};
var THdfMessageGroupInfo = {
   $ClassName:"THdfMessageGroupInfo",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FFlags$1 = $.FMaximumCompact = $.FMinimumDense = $.FEstimatedNumberOfEntries = $.FEstimatedLinkNameLength = 0;
   }
   ,LoadFromStream$1:function(Self, Stream$4) {
      THdfDataObjectMessage.LoadFromStream$1(Self,Stream$4);
      if (Self.FVersion$1) {
         throw Exception.Create($New(Exception),"Unsupported version of group info message");
      }
      Self.FFlags$1 = TStream.ReadIntegerExcept(Stream$4,1);
      if (Self.FFlags$1&1) {
         Self.FMaximumCompact = TStream.ReadIntegerExcept(Stream$4,2);
         Self.FMinimumDense = TStream.ReadIntegerExcept(Stream$4,2);
      }
      if (Self.FFlags$1&2) {
         Self.FEstimatedNumberOfEntries = TStream.ReadIntegerExcept(Stream$4,2);
         Self.FEstimatedLinkNameLength = TStream.ReadIntegerExcept(Stream$4,2);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$1$:function($){return $.ClassType.LoadFromStream$1.apply($.ClassType, arguments)}
};
var THdfMessageFilterPipeline = {
   $ClassName:"THdfMessageFilterPipeline",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FFilters = 0;
   }
   ,LoadFromStream$1:function(Self, Stream$5) {
      var Index = 0;
      var FilterIdentificationValue = 0;
      var Flags$1 = 0;
      var NumberClientDataValues = 0;
      var ValueIndex = 0;
      var ClientData = 0;
      THdfDataObjectMessage.LoadFromStream$1(Self,Stream$5);
      if (Self.FVersion$1!=2) {
         throw Exception.Create($New(Exception),"Unsupported version of the filter pipeline message");
      }
      Self.FFilters = TStream.ReadIntegerExcept(Stream$5,1);
      if (Self.FFilters>32) {
         throw Exception.Create($New(Exception),"filter pipeline message has too many filters");
      }
      var $temp1;
      for(Index=0,$temp1=Self.FFilters;Index<$temp1;Index++) {
         FilterIdentificationValue = TStream.ReadIntegerExcept(Stream$5,2);
         if (([1,2].indexOf(~FilterIdentificationValue)>=0)) {
            throw Exception.Create($New(Exception),"Unsupported filter");
         }
         Flags$1 = TStream.ReadIntegerExcept(Stream$5,2);
         NumberClientDataValues = TStream.ReadIntegerExcept(Stream$5,2);
         var $temp2;
         for(ValueIndex=0,$temp2=NumberClientDataValues;ValueIndex<$temp2;ValueIndex++) {
            ClientData = TStream.ReadIntegerExcept(Stream$5,4);
         }
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$1$:function($){return $.ClassType.LoadFromStream$1.apply($.ClassType, arguments)}
};
var THdfMessageDataType = {
   $ClassName:"THdfMessageDataType",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FClassBitField = [0,0,0];
      $.FDataClass = $.FSize = 0;
      $.FDataType$1 = null;
   }
   ,LoadFromStream$1:function(Self, Stream$6) {
      THdfDataObjectMessage.LoadFromStream$1(Self,Stream$6);
      Self.FDataClass = Self.FVersion$1&15;
      Self.FVersion$1 = Self.FVersion$1>>>4;
      if (!((Self.FVersion$1==1||Self.FVersion$1==3))) {
         throw Exception.Create($New(Exception),"Unsupported version of data type message");
      }
      Self.FClassBitField[0] = TStream.ReadIntegerExcept(Stream$6,1);
      Self.FClassBitField[1] = TStream.ReadIntegerExcept(Stream$6,1);
      Self.FClassBitField[2] = TStream.ReadIntegerExcept(Stream$6,1);
      Self.FSize = TStream.ReadIntegerExcept(Stream$6,4);
      switch (Self.FDataClass) {
         case 0 :
            Self.FDataType$1 = THdfBaseDataType.Create$261$($New(THdfDataTypeFixedPoint),Self);
            break;
         case 1 :
            Self.FDataType$1 = THdfBaseDataType.Create$261$($New(THdfDataTypeFloatingPoint),Self);
            break;
         case 2 :
            Self.FDataType$1 = THdfBaseDataType.Create$261$($New(THdfDataTypeTime),Self);
            break;
         case 3 :
            Self.FDataType$1 = THdfBaseDataType.Create$261$($New(THdfDataTypeString),Self);
            break;
         case 4 :
            Self.FDataType$1 = THdfBaseDataType.Create$261$($New(THdfDataTypeBitfield),Self);
            break;
         case 5 :
            Self.FDataType$1 = THdfBaseDataType.Create$261$($New(THdfDataTypeOpaque),Self);
            break;
         case 6 :
            Self.FDataType$1 = THdfBaseDataType.Create$261$($New(THdfDataTypeCompound),Self);
            break;
         case 7 :
            Self.FDataType$1 = THdfBaseDataType.Create$261$($New(THdfDataTypeReference),Self);
            break;
         case 8 :
            Self.FDataType$1 = THdfBaseDataType.Create$261$($New(THdfDataTypeEnumerated),Self);
            break;
         case 9 :
            Self.FDataType$1 = THdfBaseDataType.Create$261$($New(THdfDataTypeVariableLength),Self);
            break;
         case 10 :
            Self.FDataType$1 = THdfBaseDataType.Create$261$($New(THdfDataTypeArray),Self);
            break;
         default :
            throw Exception.Create($New(Exception),("Unknown datatype ("+Self.FDataClass.toString()+")"));
      }
      if (Self.FDataType$1) {
         THdfBaseDataType.LoadFromStream$17$(Self.FDataType$1,Stream$6);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$1$:function($){return $.ClassType.LoadFromStream$1.apply($.ClassType, arguments)}
};
var THdfMessageDataSpace = {
   $ClassName:"THdfMessageDataSpace",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FDimensionality = $.FFlags$2 = $.FType = 0;
      $.FDimensionMaxSize = [];
      $.FDimensionSize = [];
   }
   ,LoadFromStream$1:function(Self, Stream$7) {
      var Index$1 = 0;
      var Size$2 = 0,
         MaxSize = 0;
      THdfDataObjectMessage.LoadFromStream$1(Self,Stream$7);
      if (!((Self.FVersion$1==1||Self.FVersion$1==2))) {
         throw Exception.Create($New(Exception),"Unsupported version of dataspace message");
      }
      Self.FDimensionality = TStream.ReadIntegerExcept(Stream$7,1);
      Self.FFlags$2 = TStream.ReadIntegerExcept(Stream$7,1);
      if (Self.FVersion$1==1) {
         TStream.Seek(Stream$7,5,true);
         throw Exception.Create($New(Exception),"Unsupported version of dataspace message");
      }
      Self.FType = TStream.ReadIntegerExcept(Stream$7,1);
      var $temp3;
      for(Index$1=0,$temp3=Self.FDimensionality;Index$1<$temp3;Index$1++) {
         Size$2 = TStream.ReadIntegerExcept(Stream$7,Self.FSuperBlock.FLengthsSize);
         Self.FDimensionSize.push(Size$2);
      }
      if (Self.FFlags$2&1) {
         var $temp4;
         for(Index$1=0,$temp4=Self.FDimensionality;Index$1<$temp4;Index$1++) {
            MaxSize = TStream.ReadIntegerExcept(Stream$7,Self.FSuperBlock.FLengthsSize);
            Self.FDimensionMaxSize.push(MaxSize);
         }
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$1$:function($){return $.ClassType.LoadFromStream$1.apply($.ClassType, arguments)}
};
var THdfMessageDataLayout = {
   $ClassName:"THdfMessageDataLayout",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FLayoutClass = $.FDataAddress = $.FDataSize = $.FDimensionality$1 = 0;
   }
   ,ReadTree:function(Self, Stream$8, Size$3) {
      var Key = 0;
      var Signature$1 = "",
         NodeType = 0,
         NodeLevel = 0,
         EntriesUsed = 0,
         AddressLeftSibling = 0,
         AddressRightSibling = 0,
         Elements = 0,
         DimensionIndex = 0;
      var ElementSize = 0,
         Output = null,
         ElementIndex = 0;
      var ChunkSize = 0,
         FilterMask = 0,
         Start = [],
         DimensionIndex$1 = 0;
      var StartPos = 0,
         BreakCondition = 0,
         ChildPointer = 0,
         StreamPos$1 = 0,
         ByteData = null,
         Inflate = null,
         Input = null,
         sx = 0,
         ByteIndex = 0;
      var b$1 = 0,
         x$14 = 0,
         sx$1 = 0,
         sy = 0,
         dy$1 = 0,
         ByteIndex$1 = 0;
      var b$2 = 0,
         x$15 = 0,
         y$14 = 0,
         sx$2 = 0,
         sy$1 = 0,
         sz = 0,
         dy$2 = 0,
         dz = 0,
         ByteIndex$2 = 0;
      var b$3 = 0,
         x$16 = 0,
         z$2 = 0,
         y$15 = 0,
         CheckSum = 0;
      if (Self.FDataObject.FDataSpace.FDimensionality>3) {
         throw Exception.Create($New(EHdfInvalidFormat),"Error reading dimensions");
      }
      Signature$1 = TStream.ReadStringExcept(Stream$8,4);
      if (Signature$1!="TREE") {
         throw Exception.Create($New(Exception),("Wrong signature ("+Signature$1.toString()+")"));
      }
      NodeType = TStream.ReadIntegerExcept(Stream$8,1);
      NodeLevel = TStream.ReadIntegerExcept(Stream$8,1);
      EntriesUsed = TStream.ReadIntegerExcept(Stream$8,2);
      AddressLeftSibling = TStream.ReadIntegerExcept(Stream$8,Self.FSuperBlock.FOffsetSize);
      AddressRightSibling = TStream.ReadIntegerExcept(Stream$8,Self.FSuperBlock.FOffsetSize);
      Elements = 1;
      var $temp5;
      for(DimensionIndex=0,$temp5=Self.FDataObject.FDataSpace.FDimensionality;DimensionIndex<$temp5;DimensionIndex++) {
         Elements*=THdfDataObject.GetDataLayoutChunk(Self.FDataObject,DimensionIndex);
      }
      ElementSize = THdfDataObject.GetDataLayoutChunk(Self.FDataObject,Self.FDataObject.FDataSpace.FDimensionality);
      Output = new Uint8Array(Size$3);
      var $temp6;
      for(ElementIndex=0,$temp6=(EntriesUsed*2);ElementIndex<$temp6;ElementIndex++) {
         if (!NodeType) {
            Key = TStream.ReadIntegerExcept(Stream$8,Self.FSuperBlock.FLengthsSize);
         } else {
            ChunkSize = TStream.ReadIntegerExcept(Stream$8,4);
            FilterMask = TStream.ReadIntegerExcept(Stream$8,4);
            if (FilterMask) {
               throw Exception.Create($New(Exception),"All filters must be enabled");
            }
            var $temp7;
            for(DimensionIndex$1=0,$temp7=Self.FDataObject.FDataSpace.FDimensionality;DimensionIndex$1<$temp7;DimensionIndex$1++) {
               StartPos = TStream.ReadIntegerExcept(Stream$8,8);
               Start.push(StartPos);
            }
            BreakCondition = TStream.ReadIntegerExcept(Stream$8,8);
            if (BreakCondition) {
               break;
            }
            ChildPointer = TStream.ReadIntegerExcept(Stream$8,Self.FSuperBlock.FOffsetSize);
            StreamPos$1 = Stream$8.FPosition;
            Stream$8.FPosition = ChildPointer;
            ByteData = TStream.ReadBufferExcept(Stream$8,ChunkSize);
            Inflate = new Zlib.Inflate(ByteData);
            Input = Inflate.decompress();
            $Assert(Input.byteLength==Elements*ElementSize,"","");
            switch (Self.FDataObject.FDataSpace.FDimensionality) {
               case 1 :
                  sx = Self.FDataObject.FDataSpace.FDimensionSize[0];
                  var $temp8;
                  for(ByteIndex=0,$temp8=(Elements*ElementSize);ByteIndex<$temp8;ByteIndex++) {
                     b$1 = $Div(ByteIndex,Elements);
                     x$14 = ByteIndex%Elements+Start[0];
                     if (x$14<sx) {
                        Output[(x$14*ElementSize+b$1)]=Input[ByteIndex];
                     }
                  }
                  break;
               case 2 :
                  sx$1 = Self.FDataObject.FDataSpace.FDimensionSize[0];
                  sy = Self.FDataObject.FDataSpace.FDimensionSize[1];
                  dy$1 = THdfDataObject.GetDataLayoutChunk(Self.FDataObject,1);
                  var $temp9;
                  for(ByteIndex$1=0,$temp9=(Elements*ElementSize);ByteIndex$1<$temp9;ByteIndex$1++) {
                     b$2 = $Div(ByteIndex$1,Elements);
                     x$15 = ByteIndex$1%Elements;
                     y$14 = x$15%dy$1+Start[1];
                     x$15 = ($Div(x$15,dy$1))+Start[0];
                     if (y$14<sy&&x$15<sx$1) {
                        Output[((x$15*sy+y$14)*ElementSize+b$2)]=Input[ByteIndex$1];
                     }
                  }
                  break;
               case 3 :
                  sx$2 = Self.FDataObject.FDataSpace.FDimensionSize[0];
                  sy$1 = Self.FDataObject.FDataSpace.FDimensionSize[1];
                  sz = Self.FDataObject.FDataSpace.FDimensionSize[2];
                  dy$2 = THdfDataObject.GetDataLayoutChunk(Self.FDataObject,1);
                  dz = THdfDataObject.GetDataLayoutChunk(Self.FDataObject,2);
                  var $temp10;
                  for(ByteIndex$2=0,$temp10=(Elements*ElementSize);ByteIndex$2<$temp10;ByteIndex$2++) {
                     b$3 = $Div(ByteIndex$2,Elements);
                     x$16 = ByteIndex$2%Elements;
                     z$2 = x$16%dz+Start[2];
                     y$15 = ($Div(x$16,dz))%dy$2+Start[1];
                     x$16 = ($Div(x$16,dy$2*dz))+Start[0];
                     if (z$2<sz&&y$15<sy$1&&x$16<sx$2) {
                        Output[((x$16*sz*sy$1+y$15*sz+z$2)*ElementSize+b$3)]=Input[ByteIndex$2];
                     }
                  }
                  break;
            }
            Stream$8.FPosition = StreamPos$1;
         }
      }
      TStream.WriteBuffer(Self.FDataObject.FData,Output);
      CheckSum = TStream.ReadIntegerExcept(Stream$8,4);
   }
   ,LoadFromStream$1:function(Self, Stream$9) {
      var Index$2 = 0;
      var StreamPos$2 = 0;
      var Size$4 = 0;
      var DataLayoutChunk$1 = 0;
      THdfDataObjectMessage.LoadFromStream$1(Self,Stream$9);
      if (Self.FVersion$1!=3) {
         throw Exception.Create($New(Exception),"Unsupported version of data layout message");
      }
      Self.FLayoutClass = TStream.ReadIntegerExcept(Stream$9,1);
      switch (Self.FLayoutClass) {
         case 0 :
            Self.FDataSize = TStream.ReadIntegerExcept(Stream$9,2);
            TStream.WriteBuffer(Self.FDataObject.FData,TStream.ReadBufferExcept(Stream$9,Self.FDataSize));
            break;
         case 1 :
            Self.FDataAddress = TStream.ReadIntegerExcept(Stream$9,Self.FSuperBlock.FOffsetSize);
            Self.FDataSize = TStream.ReadIntegerExcept(Stream$9,Self.FSuperBlock.FLengthsSize);
            if (Self.FDataAddress>0) {
               StreamPos$2 = Stream$9.FPosition;
               Stream$9.FPosition = Self.FDataAddress;
               TStream.WriteBuffer(Self.FDataObject.FData,TStream.ReadBufferExcept(Stream$9,Self.FDataSize));
               Stream$9.FPosition = StreamPos$2;
            }
            break;
         case 2 :
            Self.FDimensionality$1 = TStream.ReadIntegerExcept(Stream$9,1);
            Self.FDataAddress = TStream.ReadIntegerExcept(Stream$9,Self.FSuperBlock.FOffsetSize);
            var $temp11;
            for(Index$2=0,$temp11=Self.FDimensionality$1;Index$2<$temp11;Index$2++) {
               DataLayoutChunk$1 = TStream.ReadIntegerExcept(Stream$9,4);
               Self.FDataObject.FDataLayoutChunk.push(DataLayoutChunk$1);
            }
            Size$4 = Self.FDataObject.FDataLayoutChunk[Self.FDimensionality$1-1];
            var $temp12;
            for(Index$2=0,$temp12=Self.FDataObject.FDataSpace.FDimensionality;Index$2<$temp12;Index$2++) {
               Size$4*=Self.FDataObject.FDataSpace.FDimensionSize[Index$2];
            }
            if (Self.FDataAddress>0&&Self.FDataAddress<Self.FSuperBlock.FEndOfFileAddress) {
               StreamPos$2 = Stream$9.FPosition;
               Stream$9.FPosition = Self.FDataAddress;
               THdfMessageDataLayout.ReadTree(Self,Stream$9,Size$4);
               Stream$9.FPosition = StreamPos$2;
            }
            break;
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$1$:function($){return $.ClassType.LoadFromStream$1.apply($.ClassType, arguments)}
};
var THdfMessageDataFill = {
   $ClassName:"THdfMessageDataFill",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FFlags$3 = $.FSize$1 = 0;
   }
   ,LoadFromStream$1:function(Self, Stream$10) {
      THdfDataObjectMessage.LoadFromStream$1(Self,Stream$10);
      if (Self.FVersion$1!=3) {
         throw Exception.Create($New(Exception),"Unsupported version of data fill message");
      }
      Self.FFlags$3 = TStream.ReadIntegerExcept(Stream$10,1);
      if (Self.FFlags$3&(1<<5)) {
         Self.FSize$1 = TStream.ReadIntegerExcept(Stream$10,4);
         TStream.Seek(Stream$10,Self.FSize$1,true);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$1$:function($){return $.ClassType.LoadFromStream$1.apply($.ClassType, arguments)}
};
var THdfMessageAttributeInfo = {
   $ClassName:"THdfMessageAttributeInfo",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FAttributeNameBTreeAddress = $.FAttributeOrderBTreeAddress = $.FFlags$4 = $.FFractalHeapAddress$1 = $.FMaximumCreationIndex$1 = 0;
   }
   ,LoadFromStream$1:function(Self, Stream$11) {
      THdfDataObjectMessage.LoadFromStream$1(Self,Stream$11);
      if (Self.FVersion$1) {
         throw Exception.Create($New(Exception),"Unsupported version of attribute info message");
      }
      Self.FFlags$4 = TStream.ReadIntegerExcept(Stream$11,1);
      if (Self.FFlags$4&1) {
         Self.FMaximumCreationIndex$1 = TStream.ReadIntegerExcept(Stream$11,2);
      }
      Self.FFractalHeapAddress$1 = TStream.ReadIntegerExcept(Stream$11,Self.FSuperBlock.FOffsetSize);
      Self.FAttributeNameBTreeAddress = TStream.ReadIntegerExcept(Stream$11,Self.FSuperBlock.FOffsetSize);
      if (Self.FFlags$4&2) {
         Self.FAttributeOrderBTreeAddress = TStream.ReadIntegerExcept(Stream$11,Self.FSuperBlock.FOffsetSize);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$1$:function($){return $.ClassType.LoadFromStream$1.apply($.ClassType, arguments)}
};
var THdfMessageAttribute = {
   $ClassName:"THdfMessageAttribute",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FDataspaceMessage = $.FDatatypeMessage = null;
      $.FDataspaceSize = $.FDatatypeSize = $.FEncoding = $.FFlags$5 = $.FNameSize = 0;
      $.FName$1 = "";
   }
   ,LoadFromStream$1:function(Self, Stream$12) {
      var Attribute = null;
      THdfDataObjectMessage.LoadFromStream$1(Self,Stream$12);
      if (Self.FVersion$1!=3) {
         throw Exception.Create($New(Exception),"Unsupported version of group info message");
      }
      Self.FFlags$5 = TStream.ReadIntegerExcept(Stream$12,1);
      Self.FNameSize = TStream.ReadIntegerExcept(Stream$12,2);
      Self.FDatatypeSize = TStream.ReadIntegerExcept(Stream$12,2);
      Self.FDataspaceSize = TStream.ReadIntegerExcept(Stream$12,2);
      Self.FEncoding = TStream.ReadIntegerExcept(Stream$12,1);
      Self.FName$1 = TStream.ReadStringExcept(Stream$12,Self.FNameSize);
      Self.FDatatypeMessage = THdfDataObjectMessage.Create$256($New(THdfMessageDataType),Self.FSuperBlock,Self.FDataObject);
      THdfDataObjectMessage.LoadFromStream$1$(Self.FDatatypeMessage,Stream$12);
      Self.FDataspaceMessage = THdfDataObjectMessage.Create$256($New(THdfMessageDataSpace),Self.FSuperBlock,Self.FDataObject);
      THdfDataObjectMessage.LoadFromStream$1$(Self.FDataspaceMessage,Stream$12);
      Attribute = THdfAttribute.Create$267($New(THdfAttribute),Self.FName$1);
      THdfDataObject.AddAttribute(Self.FDataObject,Attribute);
      if (!Self.FDataspaceMessage.FDimensionality) {
         THdfMessageAttribute.ReadData(Self,Stream$12,Attribute);
      } else {
         THdfMessageAttribute.ReadDataDimension(Self,Stream$12,Attribute,0);
      }
   }
   ,ReadData:function(Self, Stream$13, Attribute$1) {
      var Name$6 = {};
      Name$6.v = "";
      var Value$7 = 0;
      var Dimension$1 = 0;
      var EndAddress = 0;
      switch (Self.FDatatypeMessage.FDataClass) {
         case 3 :
            SetLength(Name$6,Self.FDatatypeMessage.FSize);
            Name$6.v = TStream.ReadStringExcept(Stream$13,Self.FDatatypeMessage.FSize);
            THdfAttribute.SetValueAsString(Attribute$1,Name$6.v);
            break;
         case 6 :
            TStream.Seek(Stream$13,Self.FDatatypeMessage.FSize,true);
            break;
         case 7 :
            Value$7 = TStream.ReadIntegerExcept(Stream$13,4);
            THdfAttribute.SetValueAsInteger(Attribute$1,Value$7);
            break;
         case 9 :
            Dimension$1 = TStream.ReadIntegerExcept(Stream$13,4);
            EndAddress = TStream.ReadIntegerExcept(Stream$13,4);
            Value$7 = TStream.ReadIntegerExcept(Stream$13,4);
            Value$7 = TStream.ReadIntegerExcept(Stream$13,4);
            break;
         default :
            throw Exception.Create($New(Exception),"Error: unknown data class");
      }
   }
   ,ReadDataDimension:function(Self, Stream$14, Attribute$2, Dimension$2) {
      var Index$3 = 0;
      if (Self.FDataspaceMessage.FDimensionSize.length>0) {
         var $temp13;
         for(Index$3=0,$temp13=Self.FDataspaceMessage.FDimensionSize[0];Index$3<$temp13;Index$3++) {
            if (1<Self.FDataspaceMessage.FDimensionality) {
               THdfMessageAttribute.ReadDataDimension(Self,Stream$14,Attribute$2,Dimension$2+1);
            } else {
               THdfMessageAttribute.ReadData(Self,Stream$14,Attribute$2);
            }
         }
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$1$:function($){return $.ClassType.LoadFromStream$1.apply($.ClassType, arguments)}
};
var THdfCustomBlock = {
   $ClassName:"THdfCustomBlock",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBlockOffset = $.FChecksum$1 = $.FHeapHeaderAddress = $.FVersion$2 = 0;
      $.FDataObject$1 = $.FFractalHeap = $.FSuperBlock$1 = null;
      $.FSignature = "";
   }
   ,Create$257:function(Self, SuperBlock$4, FractalHeap, DataObject$4) {
      Self.FSuperBlock$1 = SuperBlock$4;
      Self.FFractalHeap = FractalHeap;
      Self.FDataObject$1 = DataObject$4;
      return Self
   }
   ,LoadFromStream$12:function(Self, Stream$15) {
      Self.FSignature = TStream.ReadStringExcept(Stream$15,4);
      if (Self.FSignature!=THdfCustomBlock.GetSignature$(Self.ClassType)) {
         throw Exception.Create($New(Exception),("Wrong signature ("+Self.FSignature.toString()+")"));
      }
      Self.FVersion$2 = TStream.ReadIntegerExcept(Stream$15,1);
      if (Self.FVersion$2) {
         throw Exception.Create($New(Exception),"Unsupported version of link info message");
      }
      Self.FHeapHeaderAddress = TStream.ReadIntegerExcept(Stream$15,Self.FSuperBlock$1.FOffsetSize);
      Self.FBlockOffset = 0;
      Self.FBlockOffset = TStream.ReadIntegerExcept(Stream$15,$Div(Self.FFractalHeap.FMaximumHeapSize+7,8));
   }
   ,Destroy:TObject.Destroy
   ,Create$257$:function($){return $.ClassType.Create$257.apply($.ClassType, arguments)}
   ,GetSignature$:function($){return $.GetSignature($)}
   ,LoadFromStream$12$:function($){return $.ClassType.LoadFromStream$12.apply($.ClassType, arguments)}
};
var THdfIndirectBlock = {
   $ClassName:"THdfIndirectBlock",$Parent:THdfCustomBlock
   ,$Init:function ($) {
      THdfCustomBlock.$Init($);
      $.FInitialBlockSize = $.FMaximumNumberOfDirectBlockRows = 0;
   }
   ,GetSignature:function(Self) {
      return "FHIB";
   }
   ,Create$257:function(Self, SuperBlock$5, FractalHeap$1, DataObject$5) {
      THdfCustomBlock.Create$257(Self,SuperBlock$5,FractalHeap$1,DataObject$5);
      Self.FInitialBlockSize = FractalHeap$1.FStartingBlockSize;
      return Self
   }
   ,LoadFromStream$12:function(Self, Stream$16) {
      var RowsCount = 0;
      var k = 0;
      var n = 0;
      var ChildBlockAddress = 0;
      var SizeOfFilteredDirectBlock = 0;
      var FilterMaskForDirectBlock = 0;
      var StreamPosition = 0;
      var Block = null;
      THdfCustomBlock.LoadFromStream$12(Self,Stream$16);
      if (Self.FBlockOffset) {
         throw Exception.Create($New(Exception),"Only a block offset of 0 is supported so far");
      }
      RowsCount = Math.round(Log2(Self.FInitialBlockSize)-Log2(Self.FFractalHeap.FStartingBlockSize))+1;
      Self.FMaximumNumberOfDirectBlockRows = Math.round(Log2(Self.FFractalHeap.FMaximumDirectBlockSize)-Log2(Self.FFractalHeap.FStartingBlockSize))+2;
      if (RowsCount<Self.FMaximumNumberOfDirectBlockRows) {
         k = RowsCount*Self.FFractalHeap.FTableWidth;
      } else {
         k = Self.FMaximumNumberOfDirectBlockRows*Self.FFractalHeap.FTableWidth;
      }
      n = k-Self.FMaximumNumberOfDirectBlockRows*Self.FFractalHeap.FTableWidth;
      while (k>0) {
         ChildBlockAddress = 0;
         ChildBlockAddress = TStream.ReadIntegerExcept(Stream$16,Self.FSuperBlock$1.FOffsetSize);
         if (Self.FFractalHeap.FEncodedLength>0) {
            SizeOfFilteredDirectBlock = TStream.ReadIntegerExcept(Stream$16,Self.FSuperBlock$1.FLengthsSize);
            FilterMaskForDirectBlock = TStream.ReadIntegerExcept(Stream$16,4);
         }
         if (ChildBlockAddress>0&&ChildBlockAddress<Self.FSuperBlock$1.FEndOfFileAddress) {
            StreamPosition = Stream$16.FPosition;
            Stream$16.FPosition = ChildBlockAddress;
            Block = THdfCustomBlock.Create$257$($New(THdfDirectBlock),Self.FSuperBlock$1,Self.FFractalHeap,Self.FDataObject$1);
            THdfCustomBlock.LoadFromStream$12$(Block,Stream$16);
            Stream$16.FPosition = StreamPosition;
         }
         --k;
      }
      while (n>0) {
         ChildBlockAddress = 0;
         ChildBlockAddress = TStream.ReadIntegerExcept(Stream$16,Self.FSuperBlock$1.FOffsetSize);
         if (ChildBlockAddress>0&&ChildBlockAddress<Self.FSuperBlock$1.FEndOfFileAddress) {
            StreamPosition = Stream$16.FPosition;
            Stream$16.FPosition = ChildBlockAddress;
            Block = THdfCustomBlock.Create$257$($New(THdfIndirectBlock),Self.FSuperBlock$1,Self.FFractalHeap,Self.FDataObject$1);
            THdfCustomBlock.LoadFromStream$12$(Block,Stream$16);
            Stream$16.FPosition = StreamPosition;
         }
         --n;
      }
   }
   ,Destroy:TObject.Destroy
   ,Create$257$:function($){return $.ClassType.Create$257.apply($.ClassType, arguments)}
   ,GetSignature$:function($){return $.GetSignature($)}
   ,LoadFromStream$12$:function($){return $.ClassType.LoadFromStream$12.apply($.ClassType, arguments)}
};
var THdfFractalHeap = {
   $ClassName:"THdfFractalHeap",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAddressManagedBlock = $.FAddressOfRootBlock = $.FAmountAllocatedManagedSpace = $.FAmountFreeSpace = $.FAmountManagedSpace = $.FBtreeAddresses = $.FCurrentNumberOfRows = $.FEncodedLength = $.FFlags$6 = $.FHeapIdLength = $.FIOFilterMask = $.FMaximumDirectBlockSize = $.FMaximumHeapSize = $.FMaximumSize = $.FNextHugeID = $.FNumberOfHugeObjects = $.FNumberOfManagedObjects = $.FNumberOfTinyObjects = $.FOffsetDirectBlockAllocation = $.FSizeOfFilteredRootDirectBlock = $.FSizeOfHugeObjects = $.FSizeOfTinyObjects = $.FStartingBlockSize = $.FStartingNumber = $.FTableWidth = $.FVersion$3 = 0;
      $.FDataObject$2 = $.FSuperBlock$2 = null;
      $.FSignature$1 = "";
   }
   ,Create$259:function(Self, SuperBlock$6, DataObject$6) {
      Self.FSuperBlock$2 = SuperBlock$6;
      Self.FDataObject$2 = DataObject$6;
      return Self
   }
   ,LoadFromStream$14:function(Self, Stream$17) {
      var Block$1 = null;
      Self.FSignature$1 = TStream.ReadStringExcept(Stream$17,4);
      if (Self.FSignature$1!="FRHP") {
         throw Exception.Create($New(Exception),("Wrong signature ("+Self.FSignature$1.toString()+")"));
      }
      Self.FVersion$3 = TStream.ReadIntegerExcept(Stream$17,1);
      if (Self.FVersion$3) {
         throw Exception.Create($New(Exception),"Unsupported version of link info message");
      }
      Self.FHeapIdLength = TStream.ReadIntegerExcept(Stream$17,2);
      Self.FEncodedLength = TStream.ReadIntegerExcept(Stream$17,2);
      Self.FFlags$6 = TStream.ReadIntegerExcept(Stream$17,1);
      Self.FMaximumSize = TStream.ReadIntegerExcept(Stream$17,4);
      Self.FNextHugeID = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FBtreeAddresses = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FOffsetSize);
      Self.FAmountFreeSpace = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FAddressManagedBlock = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FOffsetSize);
      Self.FAmountManagedSpace = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FAmountAllocatedManagedSpace = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FOffsetDirectBlockAllocation = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FNumberOfManagedObjects = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FSizeOfHugeObjects = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FNumberOfHugeObjects = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FSizeOfTinyObjects = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FNumberOfTinyObjects = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FTableWidth = TStream.ReadIntegerExcept(Stream$17,2);
      Self.FStartingBlockSize = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FMaximumDirectBlockSize = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
      Self.FMaximumHeapSize = TStream.ReadIntegerExcept(Stream$17,2);
      Self.FStartingNumber = TStream.ReadIntegerExcept(Stream$17,2);
      Self.FAddressOfRootBlock = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FOffsetSize);
      Self.FCurrentNumberOfRows = TStream.ReadIntegerExcept(Stream$17,2);
      if (Self.FEncodedLength>0) {
         Self.FSizeOfFilteredRootDirectBlock = TStream.ReadIntegerExcept(Stream$17,Self.FSuperBlock$2.FLengthsSize);
         Self.FIOFilterMask = TStream.ReadIntegerExcept(Stream$17,4);
      }
      if (Self.FNumberOfHugeObjects>0) {
         throw Exception.Create($New(Exception),"Cannot handle huge objects");
      }
      if (Self.FNumberOfTinyObjects>0) {
         throw Exception.Create($New(Exception),"Cannot handle tiny objects");
      }
      if (Self.FAddressOfRootBlock>0&&Self.FAddressOfRootBlock<Self.FSuperBlock$2.FEndOfFileAddress) {
         Stream$17.FPosition = Self.FAddressOfRootBlock;
         if (Self.FCurrentNumberOfRows) {
            Block$1 = THdfCustomBlock.Create$257$($New(THdfIndirectBlock),Self.FSuperBlock$2,Self,Self.FDataObject$2);
         } else {
            Block$1 = THdfCustomBlock.Create$257$($New(THdfDirectBlock),Self.FSuperBlock$2,Self,Self.FDataObject$2);
         }
         THdfCustomBlock.LoadFromStream$12$(Block$1,Stream$17);
      }
   }
   ,Destroy:TObject.Destroy
};
var THdfFile = {
   $ClassName:"THdfFile",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FDataObject$3 = $.FSuperBlock$3 = null;
   }
   ,Create$260:function(Self) {
      TObject.Create(Self);
      Self.FSuperBlock$3 = TObject.Create($New(THdfSuperBlock));
      Self.FDataObject$3 = THdfDataObject.Create$265($New(THdfDataObject),Self.FSuperBlock$3);
      return Self
   }
   ,GetAttribute:function(Self, Name$7) {
      return THdfDataObject.GetAttribute$1(Self.FDataObject$3,Name$7);
   }
   ,LoadFromBuffer$1:function(Self, Buffer$3) {
      THdfFile.LoadFromStream$15(Self,TStream.Create$255($New(TStream),Buffer$3));
   }
   ,LoadFromStream$15:function(Self, Stream$18) {
      THdfSuperBlock.LoadFromStream(Self.FSuperBlock$3,Stream$18);
      THdfDataObject.LoadFromStream$24(Self.FDataObject$3,Stream$18);
   }
   ,Destroy:TObject.Destroy
};
var THdfDirectBlock = {
   $ClassName:"THdfDirectBlock",$Parent:THdfCustomBlock
   ,$Init:function ($) {
      THdfCustomBlock.$Init($);
   }
   ,GetSignature:function(Self) {
      return "FHDB";
   }
   ,LoadFromStream$12:function(Self, Stream$19) {
      var OffsetSize$1 = 0;
      var LengthSize = 0;
      var TypeAndVersion = 0;
      var OffsetX = 0;
      var LengthX = 0;
      var Name$8 = "";
      var Value$8 = "";
      var Attribute$3 = null;
      var HeapHeaderAddress = 0;
      var StreamPos$3 = 0;
      var SubDataObject = null;
      var Temp = 0,
         ValueType = 0,
         TypeExtend = 0,
         Temp$1 = 0;
      THdfCustomBlock.LoadFromStream$12(Self,Stream$19);
      if (Self.FFractalHeap.FFlags$6&2) {
         Self.FChecksum$1 = TStream.ReadIntegerExcept(Stream$19,4);
      }
      OffsetSize$1 = Math.ceil(Log2(Self.FFractalHeap.FMaximumHeapSize)/8);
      if (Self.FFractalHeap.FMaximumDirectBlockSize<Self.FFractalHeap.FMaximumSize) {
         LengthSize = Math.ceil(Log2(Self.FFractalHeap.FMaximumDirectBlockSize)/8);
      } else {
         LengthSize = Math.ceil(Log2(Self.FFractalHeap.FMaximumSize)/8);
      }
      do {
         TypeAndVersion = TStream.ReadIntegerExcept(Stream$19,1);
         OffsetX = 0;
         LengthX = 0;
         OffsetX = TStream.ReadIntegerExcept(Stream$19,OffsetSize$1);
         LengthX = TStream.ReadIntegerExcept(Stream$19,LengthSize);
         if (TypeAndVersion==3) {
            Temp = 0;
            Temp = TStream.ReadIntegerExcept(Stream$19,5);
            if (Temp!=262152) {
               throw Exception.Create($New(Exception),"Unsupported values");
            }
            Name$8 = TStream.ReadStringExcept(Stream$19,LengthX);
            Temp = 0;
            Temp = TStream.ReadIntegerExcept(Stream$19,4);
            if (Temp!=19) {
               throw Exception.Create($New(Exception),"Unsupported values");
            }
            LengthX = TStream.ReadIntegerExcept(Stream$19,2);
            ValueType = TStream.ReadIntegerExcept(Stream$19,4);
            TypeExtend = TStream.ReadIntegerExcept(Stream$19,2);
            if (ValueType==131072) {
               if (!TypeExtend) {
                  Value$8 = TStream.ReadStringExcept(Stream$19,LengthX);
               } else if (TypeExtend==200) {
                  Value$8 = "";
               }
            }
            Attribute$3 = THdfAttribute.Create$267($New(THdfAttribute),Name$8);
            THdfAttribute.SetValueAsString(Attribute$3,Value$8);
            THdfDataObject.AddAttribute(Self.FDataObject$1,Attribute$3);
         } else if (TypeAndVersion==1) {
            Temp$1 = 0;
            Temp$1 = TStream.ReadIntegerExcept(Stream$19,6);
            if (Temp$1) {
               throw Exception.Create($New(Exception),"FHDB type 1 unsupported values");
            }
            LengthX = TStream.ReadIntegerExcept(Stream$19,1);
            Name$8 = TStream.ReadStringExcept(Stream$19,LengthX);
            HeapHeaderAddress = TStream.ReadIntegerExcept(Stream$19,Self.FSuperBlock$1.FOffsetSize);
            StreamPos$3 = Stream$19.FPosition;
            Stream$19.FPosition = HeapHeaderAddress;
            SubDataObject = THdfDataObject.Create$266($New(THdfDataObject),Self.FSuperBlock$1,Name$8);
            THdfDataObject.LoadFromStream$24(SubDataObject,Stream$19);
            THdfDataObject.AddDataObject(Self.FDataObject$1,SubDataObject);
            Stream$19.FPosition = StreamPos$3;
         }
      } while (!(TypeAndVersion==0));
   }
   ,Destroy:TObject.Destroy
   ,Create$257:THdfCustomBlock.Create$257
   ,GetSignature$:function($){return $.GetSignature($)}
   ,LoadFromStream$12$:function($){return $.ClassType.LoadFromStream$12.apply($.ClassType, arguments)}
};
var THdfBaseDataType = {
   $ClassName:"THdfBaseDataType",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FDataTypeMessage = null;
   }
   ,Create$261:function(Self, DatatypeMessage) {
      Self.FDataTypeMessage = DatatypeMessage;
      return Self
   }
   ,LoadFromStream$17:function(Self, Stream$20) {
      /* null */
   }
   ,Destroy:TObject.Destroy
   ,Create$261$:function($){return $.ClassType.Create$261.apply($.ClassType, arguments)}
   ,LoadFromStream$17$:function($){return $.ClassType.LoadFromStream$17.apply($.ClassType, arguments)}
};
var THdfDataTypeVariableLength = {
   $ClassName:"THdfDataTypeVariableLength",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
      $.FDataType$2 = null;
   }
   ,Create$261:function(Self, DatatypeMessage$1) {
      THdfBaseDataType.Create$261(Self,DatatypeMessage$1);
      Self.FDataType$2 = THdfDataObjectMessage.Create$256($New(THdfMessageDataType),Self.FDataTypeMessage.FSuperBlock,Self.FDataTypeMessage.FDataObject);
      return Self
   }
   ,LoadFromStream$17:function(Self, Stream$21) {
      THdfDataObjectMessage.LoadFromStream$1$(Self.FDataType$2,Stream$21);
   }
   ,Destroy:TObject.Destroy
   ,Create$261$:function($){return $.ClassType.Create$261.apply($.ClassType, arguments)}
   ,LoadFromStream$17$:function($){return $.ClassType.LoadFromStream$17.apply($.ClassType, arguments)}
};
var THdfDataTypeTime = {
   $ClassName:"THdfDataTypeTime",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
      $.FBitPrecision = 0;
   }
   ,LoadFromStream$17:function(Self, Stream$22) {
      Self.FBitPrecision = TStream.ReadIntegerExcept(Stream$22,2);
   }
   ,Destroy:TObject.Destroy
   ,Create$261:THdfBaseDataType.Create$261
   ,LoadFromStream$17$:function($){return $.ClassType.LoadFromStream$17.apply($.ClassType, arguments)}
};
var THdfDataTypeString = {
   $ClassName:"THdfDataTypeString",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$261:THdfBaseDataType.Create$261
   ,LoadFromStream$17:THdfBaseDataType.LoadFromStream$17
};
var THdfDataTypeReference = {
   $ClassName:"THdfDataTypeReference",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$261:THdfBaseDataType.Create$261
   ,LoadFromStream$17:THdfBaseDataType.LoadFromStream$17
};
var THdfDataTypeOpaque = {
   $ClassName:"THdfDataTypeOpaque",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$261:THdfBaseDataType.Create$261
   ,LoadFromStream$17:THdfBaseDataType.LoadFromStream$17
};
var THdfDataTypeFloatingPoint = {
   $ClassName:"THdfDataTypeFloatingPoint",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
      $.FBitOffset = $.FBitPrecision$1 = $.FExponentBias = $.FExponentLocation = $.FExponentSize = $.FMantissaLocation = $.FMantissaSize = 0;
   }
   ,LoadFromStream$17:function(Self, Stream$23) {
      Self.FBitOffset = TStream.ReadIntegerExcept(Stream$23,2);
      Self.FBitPrecision$1 = TStream.ReadIntegerExcept(Stream$23,2);
      Self.FExponentLocation = TStream.ReadIntegerExcept(Stream$23,1);
      Self.FExponentSize = TStream.ReadIntegerExcept(Stream$23,1);
      Self.FMantissaLocation = TStream.ReadIntegerExcept(Stream$23,1);
      Self.FMantissaSize = TStream.ReadIntegerExcept(Stream$23,1);
      Self.FExponentBias = TStream.ReadIntegerExcept(Stream$23,4);
      if (Self.FBitOffset) {
         throw Exception.Create($New(Exception),"Unsupported bit offset");
      }
      if (Self.FMantissaLocation) {
         throw Exception.Create($New(Exception),"Unsupported mantissa location");
      }
      if (Self.FBitPrecision$1==32) {
         if (Self.FExponentLocation!=23) {
            throw Exception.Create($New(Exception),"Unsupported exponent location");
         }
         if (Self.FExponentSize!=8) {
            throw Exception.Create($New(Exception),"Unsupported exponent size");
         }
         if (Self.FMantissaSize!=23) {
            throw Exception.Create($New(Exception),"Unsupported mantissa size");
         }
         if (Self.FExponentBias!=127) {
            throw Exception.Create($New(Exception),"Unsupported exponent bias");
         }
      } else if (Self.FBitPrecision$1==64) {
         if (Self.FExponentLocation!=52) {
            throw Exception.Create($New(Exception),"Unsupported exponent location");
         }
         if (Self.FExponentSize!=11) {
            throw Exception.Create($New(Exception),"Unsupported exponent size");
         }
         if (Self.FMantissaSize!=52) {
            throw Exception.Create($New(Exception),"Unsupported mantissa size");
         }
         if (Self.FExponentBias!=1023) {
            throw Exception.Create($New(Exception),"Unsupported exponent bias");
         }
      } else {
         throw Exception.Create($New(Exception),"Unsupported bit precision");
      }
   }
   ,Destroy:TObject.Destroy
   ,Create$261:THdfBaseDataType.Create$261
   ,LoadFromStream$17$:function($){return $.ClassType.LoadFromStream$17.apply($.ClassType, arguments)}
};
var THdfDataTypeFixedPoint = {
   $ClassName:"THdfDataTypeFixedPoint",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
      $.FBitOffset$1 = $.FBitPrecision$2 = 0;
   }
   ,LoadFromStream$17:function(Self, Stream$24) {
      THdfBaseDataType.LoadFromStream$17(Self,Stream$24);
      Self.FBitOffset$1 = TStream.ReadIntegerExcept(Stream$24,2);
      Self.FBitPrecision$2 = TStream.ReadIntegerExcept(Stream$24,2);
   }
   ,Destroy:TObject.Destroy
   ,Create$261:THdfBaseDataType.Create$261
   ,LoadFromStream$17$:function($){return $.ClassType.LoadFromStream$17.apply($.ClassType, arguments)}
};
var THdfDataTypeEnumerated = {
   $ClassName:"THdfDataTypeEnumerated",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$261:THdfBaseDataType.Create$261
   ,LoadFromStream$17:THdfBaseDataType.LoadFromStream$17
};
var THdfDataTypeCompoundPart = {
   $ClassName:"THdfDataTypeCompoundPart",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FName$2 = "";
      $.FByteOffset = $.FSize$2 = 0;
      $.FDataType$3 = null;
   }
   ,Create$263:function(Self, DatatypeMessage$2) {
      Self.FDataType$3 = THdfDataObjectMessage.Create$256($New(THdfMessageDataType),DatatypeMessage$2.FSuperBlock,DatatypeMessage$2.FDataObject);
      Self.FSize$2 = DatatypeMessage$2.FSize;
      return Self
   }
   ,ReadFromStream:function(Self, Stream$25) {
      var ByteIndex$3 = 0;
      var ByteValue = 0;
      var Temp$2 = 0;
      Self.FName$2 = "";
      do {
         ByteValue = TStream.ReadIntegerExcept(Stream$25,1);
         Self.FName$2 = Self.FName$2+Chr(ByteValue);
      } while (!(ByteValue==0));
      ByteIndex$3 = 0;
      do {
         Temp$2 = TStream.ReadIntegerExcept(Stream$25,1);
         Self.FByteOffset+=Temp$2<<(ByteIndex$3*8);
         ++ByteIndex$3;
      } while (!((1<<(ByteIndex$3*8))>Self.FSize$2));
      THdfDataObjectMessage.LoadFromStream$1$(Self.FDataType$3,Stream$25);
   }
   ,Destroy:TObject.Destroy
};
var THdfDataTypeCompound = {
   $ClassName:"THdfDataTypeCompound",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
      $.FDataTypes = [];
   }
   ,Create$261:function(Self, DatatypeMessage$3) {
      THdfBaseDataType.Create$261(Self,DatatypeMessage$3);
      return Self
   }
   ,LoadFromStream$17:function(Self, Stream$26) {
      var Index$4 = 0;
      var Count$5 = 0;
      var Part = null;
      if (Self.FDataTypeMessage.FVersion$1!=3) {
         throw Exception.Create($New(Exception),("Error unsupported compound version ("+Self.FDataTypeMessage.FVersion$1.toString()+")"));
      }
      Count$5 = (Self.FDataTypeMessage.FClassBitField[1]<<8)+Self.FDataTypeMessage.FClassBitField[0];
      var $temp14;
      for(Index$4=0,$temp14=Count$5;Index$4<$temp14;Index$4++) {
         Part = THdfDataTypeCompoundPart.Create$263($New(THdfDataTypeCompoundPart),Self.FDataTypeMessage);
         THdfDataTypeCompoundPart.ReadFromStream(Part,Stream$26);
         Self.FDataTypes.push(Part);
      }
   }
   ,Destroy:TObject.Destroy
   ,Create$261$:function($){return $.ClassType.Create$261.apply($.ClassType, arguments)}
   ,LoadFromStream$17$:function($){return $.ClassType.LoadFromStream$17.apply($.ClassType, arguments)}
};
var THdfDataTypeBitfield = {
   $ClassName:"THdfDataTypeBitfield",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
      $.FBitOffset$2 = $.FBitPrecision$3 = 0;
   }
   ,LoadFromStream$17:function(Self, Stream$27) {
      Self.FBitOffset$2 = TStream.ReadIntegerExcept(Stream$27,2);
      Self.FBitPrecision$3 = TStream.ReadIntegerExcept(Stream$27,2);
   }
   ,Destroy:TObject.Destroy
   ,Create$261:THdfBaseDataType.Create$261
   ,LoadFromStream$17$:function($){return $.ClassType.LoadFromStream$17.apply($.ClassType, arguments)}
};
var THdfDataTypeArray = {
   $ClassName:"THdfDataTypeArray",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$261:THdfBaseDataType.Create$261
   ,LoadFromStream$17:THdfBaseDataType.LoadFromStream$17
};
var THdfDataObject = {
   $ClassName:"THdfDataObject",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAccessTime = $.FBirthTime = $.FChangeTime = $.FChunkSize = $.FFlags$7 = $.FMaximumCompact$1 = $.FMinimumDense$1 = $.FModificationTime = $.FVersion$4 = 0;
      $.FAttributeInfo = $.FAttributesHeap = $.FData = $.FDataSpace = $.FDataType$4 = $.FGroupInfo = $.FLinkInfo = $.FObjectsHeap = $.FSuperBlock$4 = null;
      $.FAttributeList = [];
      $.FDataLayoutChunk = [];
      $.FDataObjects = [];
      $.FName$3 = "";
      $.FSignature$2 = "";
   }
   ,AddAttribute:function(Self, Attribute$4) {
      Self.FAttributeList.push(Attribute$4);
   }
   ,AddDataObject:function(Self, DataObject$7) {
      Self.FDataObjects.push(DataObject$7);
   }
   ,Create$266:function(Self, SuperBlock$7, Name$9) {
      THdfDataObject.Create$265(Self,SuperBlock$7);
      Self.FName$3 = Name$9;
      return Self
   }
   ,Create$265:function(Self, SuperBlock$8) {
      Self.FSuperBlock$4 = SuperBlock$8;
      Self.FName$3 = "";
      Self.FDataType$4 = THdfDataObjectMessage.Create$256($New(THdfMessageDataType),Self.FSuperBlock$4,Self);
      Self.FDataSpace = THdfDataObjectMessage.Create$256($New(THdfMessageDataSpace),Self.FSuperBlock$4,Self);
      Self.FLinkInfo = THdfDataObjectMessage.Create$256($New(THdfMessageLinkInfo),Self.FSuperBlock$4,Self);
      Self.FGroupInfo = THdfDataObjectMessage.Create$256($New(THdfMessageGroupInfo),Self.FSuperBlock$4,Self);
      Self.FAttributeInfo = THdfDataObjectMessage.Create$256($New(THdfMessageAttributeInfo),Self.FSuperBlock$4,Self);
      Self.FAttributesHeap = THdfFractalHeap.Create$259($New(THdfFractalHeap),Self.FSuperBlock$4,Self);
      Self.FObjectsHeap = THdfFractalHeap.Create$259($New(THdfFractalHeap),Self.FSuperBlock$4,Self);
      Self.FData = TStream.Create$255($New(TStream),new ArrayBuffer(0));
      return Self
   }
   ,GetAttribute$1:function(Self, Name$10) {
      var Result = "";
      var Index$5 = 0;
      Result = "";
      var $temp15;
      for(Index$5=0,$temp15=THdfDataObject.GetAttributeListCount(Self);Index$5<$temp15;Index$5++) {
         if (THdfDataObject.GetAttributeListItem(Self,Index$5).FName$4==Name$10) {
            return THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(Self,Index$5));
         }
      }
      return Result
   }
   ,GetAttributeListCount:function(Self) {
      return Self.FAttributeList.length;
   }
   ,GetAttributeListItem:function(Self, Index$6) {
      var Result = null;
      if (Index$6<0||Index$6>=Self.FAttributeList.length) {
         throw Exception.Create($New(Exception),("Index out of bounds ("+Index$6.toString()+")"));
      }
      Result = Self.FAttributeList[Index$6];
      return Result
   }
   ,GetDataLayoutChunk:function(Self, Index$7) {
      var Result = 0;
      if (Index$7<0||Index$7>=Self.FDataLayoutChunk.length) {
         throw Exception.Create($New(Exception),("Index out of bounds ("+Index$7.toString()+")"));
      }
      Result = Self.FDataLayoutChunk[Index$7];
      return Result
   }
   ,GetDataObject:function(Self, Index$8) {
      var Result = null;
      if (Index$8<0||Index$8>=Self.FDataObjects.length) {
         throw Exception.Create($New(Exception),("Index out of bounds ("+Index$8.toString()+")"));
      }
      Result = Self.FDataObjects[Index$8];
      return Result
   }
   ,GetDataObjectCount:function(Self) {
      return Self.FDataObjects.length;
   }
   ,LoadFromStream$24:function(Self, Stream$28) {
      Self.FSignature$2 = TStream.ReadStringExcept(Stream$28,4);
      if (Self.FSignature$2!="OHDR") {
         throw Exception.Create($New(Exception),("Wrong signature ("+Self.FSignature$2.toString()+")"));
      }
      Self.FVersion$4 = TStream.ReadIntegerExcept(Stream$28,1);
      if (Self.FVersion$4!=2) {
         throw Exception.Create($New(Exception),"Invalid verion");
      }
      Self.FFlags$7 = TStream.ReadIntegerExcept(Stream$28,1);
      if (Self.FFlags$7&(1<<5)) {
         Self.FAccessTime = TStream.ReadIntegerExcept(Stream$28,4);
         Self.FModificationTime = TStream.ReadIntegerExcept(Stream$28,4);
         Self.FChangeTime = TStream.ReadIntegerExcept(Stream$28,4);
         Self.FBirthTime = TStream.ReadIntegerExcept(Stream$28,4);
      }
      if (Self.FFlags$7&(1<<4)) {
         Self.FMaximumCompact$1 = TStream.ReadIntegerExcept(Stream$28,2);
         Self.FMinimumDense$1 = TStream.ReadIntegerExcept(Stream$28,2);
      }
      Self.FChunkSize = TStream.ReadIntegerExcept(Stream$28,1<<(Self.FFlags$7&3));
      THdfDataObject.ReadObjectHeaderMessages(Self,Stream$28,Stream$28.FPosition+Self.FChunkSize);
      if (Self.FAttributeInfo.FFractalHeapAddress$1>0&&Self.FAttributeInfo.FFractalHeapAddress$1<Self.FSuperBlock$4.FEndOfFileAddress) {
         Stream$28.FPosition = Self.FAttributeInfo.FFractalHeapAddress$1;
         THdfFractalHeap.LoadFromStream$14(Self.FAttributesHeap,Stream$28);
      }
      if (Self.FLinkInfo.FFractalHeapAddress>0&&Self.FLinkInfo.FFractalHeapAddress<Self.FSuperBlock$4.FEndOfFileAddress) {
         Stream$28.FPosition = Self.FLinkInfo.FFractalHeapAddress;
         THdfFractalHeap.LoadFromStream$14(Self.FObjectsHeap,Stream$28);
      }
   }
   ,ReadObjectHeaderMessages:function(Self, Stream$29, EndOfStream) {
      var MessageType = 0;
      var MessageSize = 0;
      var MessageFlags = 0;
      var EndPos = 0;
      var DataObjectMessage = null;
      while (Stream$29.FPosition<EndOfStream-4) {
         MessageType = TStream.ReadIntegerExcept(Stream$29,1);
         MessageSize = TStream.ReadIntegerExcept(Stream$29,2);
         MessageFlags = TStream.ReadIntegerExcept(Stream$29,1);
         if (MessageFlags&(~5)) {
            throw Exception.Create($New(Exception),"Unsupported OHDR message flag");
         }
         if (Self.FFlags$7&(1<<2)) {
            TStream.Seek(Stream$29,2,true);
         }
         EndPos = Stream$29.FPosition+MessageSize;
         DataObjectMessage = null;
         switch (MessageType) {
            case 0 :
               TStream.Seek(Stream$29,MessageSize,true);
               break;
            case 1 :
               DataObjectMessage = Self.FDataSpace;
               break;
            case 2 :
               DataObjectMessage = Self.FLinkInfo;
               break;
            case 3 :
               DataObjectMessage = Self.FDataType$4;
               break;
            case 5 :
               DataObjectMessage = THdfDataObjectMessage.Create$256($New(THdfMessageDataFill),Self.FSuperBlock$4,Self);
               break;
            case 8 :
               DataObjectMessage = THdfDataObjectMessage.Create$256($New(THdfMessageDataLayout),Self.FSuperBlock$4,Self);
               break;
            case 10 :
               DataObjectMessage = Self.FGroupInfo;
               break;
            case 11 :
               DataObjectMessage = THdfDataObjectMessage.Create$256($New(THdfMessageFilterPipeline),Self.FSuperBlock$4,Self);
               break;
            case 12 :
               DataObjectMessage = THdfDataObjectMessage.Create$256($New(THdfMessageAttribute),Self.FSuperBlock$4,Self);
               break;
            case 16 :
               DataObjectMessage = THdfDataObjectMessage.Create$256($New(THdfMessageHeaderContinuation),Self.FSuperBlock$4,Self);
               break;
            case 21 :
               DataObjectMessage = Self.FAttributeInfo;
               break;
            default :
               throw Exception.Create($New(Exception),("Unknown header message ("+MessageType.toString()+")"));
         }
         if (DataObjectMessage) {
            THdfDataObjectMessage.LoadFromStream$1$(DataObjectMessage,Stream$29);
         }
         if (Stream$29.FPosition!=EndPos) {
            $Assert(Stream$29.FPosition==EndPos,"","");
         }
      }
   }
   ,Destroy:TObject.Destroy
};
var THdfAttribute = {
   $ClassName:"THdfAttribute",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FName$4 = "";
      $.FStream = null;
   }
   ,Create$267:function(Self, Name$11) {
      Self.FName$4 = Trim$_String_(Name$11);
      Self.FStream = TStream.Create$255($New(TStream),new ArrayBuffer(0));
      return Self
   }
   ,GetValueAsInteger:function(Self) {
      var Result = 0;
      Self.FStream.FPosition = 0;
      Result = TStream.ReadIntegerExcept(Self.FStream,4);
      return Result
   }
   ,GetValueAsString:function(Self) {
      var Result = "";
      if (!TStream.a$35(Self.FStream)) {
         Result = "";
         return Result;
      }
      Self.FStream.FPosition = 0;
      Result = TStream.ReadStringExcept(Self.FStream,TStream.a$35(Self.FStream));
      return Result
   }
   ,SetValueAsInteger:function(Self, Value$9) {
      TStream.Clear$1(Self.FStream);
      TStream.WriteInteger(Self.FStream,4,Value$9);
   }
   ,SetValueAsString:function(Self, Value$10) {
      TStream.Clear$1(Self.FStream);
      TStream.WriteString(Self.FStream,Value$10);
   }
   ,Destroy:TObject.Destroy
};
var EHdfInvalidFormat = {
   $ClassName:"EHdfInvalidFormat",$Parent:Exception
   ,$Init:function ($) {
      Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
var TSofaFile = {
   $ClassName:"TSofaFile",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAPIName = $.FAPIVersion = $.FApplicationName = $.FApplicationVersion = $.FAuthorContact = $.FComment = $.FDataType = $.FDateCreated = $.FDateModified = $.FHistory = $.FLicense = $.FOrganization = $.FOrigin = $.FReferences = $.FRoomType = $.FTitle = "";
      $.FDelay = [];
      $.FEmitterPositions = [];
      $.FImpulseResponses = [];
      $.FListenerPositions = [];
      $.FListenerUp = {X$2:0,Y$2:0,Z:0};
      $.FListenerView = {X$2:0,Y$2:0,Z:0};
      $.FNumberOfDataSamples = $.FNumberOfEmitters = $.FNumberOfMeasurements = $.FNumberOfReceivers = $.FNumberOfSources = 0;
      $.FReceiverPositions = [];
      $.FSampleRate = [];
      $.FSourcePositions = [];
   }
   ,GetDelay:function(Self, Index$9) {
      var Result = 0;
      if (Index$9<0||Index$9>=Self.FDelay.length) {
         throw Exception.Create($New(Exception),("Index out of bounds ("+Index$9.toString()+")"));
      }
      Result = Self.FDelay[Index$9];
      return Result
   }
   ,GetSampleRate:function(Self, Index$10) {
      var Result = 0;
      if (Index$10<0||Index$10>=Self.FSampleRate.length) {
         throw Exception.Create($New(Exception),("Index out of bounds ("+Index$10.toString()+")"));
      }
      Result = Self.FSampleRate[Index$10];
      return Result
   }
   ,LoadFromBuffer:function(Self, Buffer$4) {
      var HdfFile = null;
      var Index$11 = 0;
      HdfFile = THdfFile.Create$260($New(THdfFile));
      try {
         THdfFile.LoadFromBuffer$1(HdfFile,Buffer$4);
         if (THdfFile.GetAttribute(HdfFile,"Conventions")!="SOFA") {
            throw Exception.Create($New(Exception),"File does not contain the SOFA convention");
         }
         var $temp16;
         for(Index$11=0,$temp16=THdfDataObject.GetDataObjectCount(HdfFile.FDataObject$3);Index$11<$temp16;Index$11++) {
            TSofaFile.ReadDataObject(Self,THdfDataObject.GetDataObject(HdfFile.FDataObject$3,Index$11));
         }
         TSofaFile.ReadAttributes(Self,HdfFile.FDataObject$3);
      } finally {
         TObject.Free(HdfFile);
      }
   }
   ,ReadAttributes:function(Self, DataObject$8) {
      var Index$12 = 0;
      var $temp17;
      for(Index$12=0,$temp17=THdfDataObject.GetAttributeListCount(DataObject$8);Index$12<$temp17;Index$12++) {
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="DateModified") {
            Self.FDateModified = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="History") {
            Self.FHistory = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="Comment") {
            Self.FComment = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="License") {
            Self.FLicense = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="FAPIVersion: tring;") {
            Self.FAPIVersion = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="APIName") {
            Self.FAPIName = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="Origin") {
            Self.FOrigin = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="Title") {
            Self.FTitle = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="DateCreated") {
            Self.FDateCreated = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="References") {
            Self.FReferences = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="DataType") {
            Self.FDataType = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="Organization") {
            Self.FOrganization = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="RoomType") {
            Self.FRoomType = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="ApplicationVersion") {
            Self.FApplicationVersion = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="ApplicationName") {
            Self.FApplicationName = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
         if (THdfDataObject.GetAttributeListItem(DataObject$8,Index$12).FName$4=="AuthorContact") {
            Self.FAuthorContact = THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(DataObject$8,Index$12));
         }
      }
   }
   ,ReadDataObject:function(Self, DataObject$9) {
      var ItemCount = 0,
         ItemCount$1 = 0,
         ItemCount$2 = 0,
         ItemCount$3 = 0,
         Index$13 = 0;
      var Position$2 = {X$2:0,Y$2:0,Z:0};
      var ItemCount$4 = 0,
         Index$14 = 0;
      var Position$3 = {X$2:0,Y$2:0,Z:0};
      var ItemCount$5 = 0,
         Index$15 = 0;
      var Position$4 = {X$2:0,Y$2:0,Z:0};
      var ItemCount$6 = 0,
         Index$16 = 0;
      var Position$5 = {X$2:0,Y$2:0,Z:0};
      var ItemCount$7 = 0,
         MeasurementIndex = 0;
      var ReceiverIndex = 0;
      var Index$17 = 0;
      var ItemCount$8 = 0,
         Index$18 = 0;
      var SampleRate$1 = 0,
         ItemCount$9 = 0,
         Index$19 = 0;
      var Delay$1 = 0;
      function GetDimension$1(Text$8) {
         Text$8={v:Text$8};
         var Result = 0;
         var TextPos = 0;
         Result = 0;
         TextPos = (Text$8.v.indexOf("This is a netCDF dimension but not a netCDF variable.")+1);
         if (TextPos>0) {
            Delete(Text$8,TextPos,53);
            Result = parseInt(Trim$_String_(Text$8.v),10);
         }
         return Result
      };
      DataObject$9.FData.FPosition = 0;
      if (DataObject$9.FName$3=="M") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfMeasurements = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$3=="R") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfReceivers = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$3=="E") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfEmitters = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$3=="N") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfDataSamples = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$3=="S") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         ItemCount = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$3=="I") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         ItemCount$1 = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$3=="C") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         ItemCount$2 = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$3=="ListenerPosition") {
         $Assert(TStream.a$35(DataObject$9.FData)>0,"","");
         ItemCount$3 = $Div(TStream.a$35(DataObject$9.FData),3*DataObject$9.FDataType$4.FSize);
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         var $temp18;
         for(Index$13=0,$temp18=ItemCount$3;Index$13<$temp18;Index$13++) {
            Position$2.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$2.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$2.Z = TStream.ReadFloat(DataObject$9.FData,8);
            Self.FListenerPositions.push(Clone$TVector3(Position$2));
         }
      } else if (DataObject$9.FName$3=="ReceiverPosition") {
         $Assert(TStream.a$35(DataObject$9.FData)>0,"","");
         ItemCount$4 = $Div(TStream.a$35(DataObject$9.FData),3*DataObject$9.FDataType$4.FSize);
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         var $temp19;
         for(Index$14=0,$temp19=ItemCount$4;Index$14<$temp19;Index$14++) {
            Position$3.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$3.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$3.Z = TStream.ReadFloat(DataObject$9.FData,8);
            Self.FReceiverPositions.push(Clone$TVector3(Position$3));
         }
      } else if (DataObject$9.FName$3=="SourcePosition") {
         $Assert(TStream.a$35(DataObject$9.FData)>0,"","");
         ItemCount$5 = $Div(TStream.a$35(DataObject$9.FData),3*DataObject$9.FDataType$4.FSize);
         Self.FNumberOfSources = ItemCount$5;
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         var $temp20;
         for(Index$15=0,$temp20=ItemCount$5;Index$15<$temp20;Index$15++) {
            Position$4.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$4.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$4.Z = TStream.ReadFloat(DataObject$9.FData,8);
            Self.FSourcePositions.push(Clone$TVector3(Position$4));
         }
      } else if (DataObject$9.FName$3=="EmitterPosition") {
         $Assert(TStream.a$35(DataObject$9.FData)>0,"","");
         ItemCount$6 = $Div(TStream.a$35(DataObject$9.FData),3*DataObject$9.FDataType$4.FSize);
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         var $temp21;
         for(Index$16=0,$temp21=ItemCount$6;Index$16<$temp21;Index$16++) {
            Position$5.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$5.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$5.Z = TStream.ReadFloat(DataObject$9.FData,8);
            Self.FEmitterPositions.push(Clone$TVector3(Position$5));
         }
      } else if (DataObject$9.FName$3=="ListenerUp") {
         $Assert(TStream.a$35(DataObject$9.FData)>0,"","");
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         Self.FListenerUp.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
         Self.FListenerUp.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
         Self.FListenerUp.Z = TStream.ReadFloat(DataObject$9.FData,8);
      } else if (DataObject$9.FName$3=="ListenerView") {
         $Assert(TStream.a$35(DataObject$9.FData)>0,"","");
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         Self.FListenerView.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
         Self.FListenerView.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
         Self.FListenerView.Z = TStream.ReadFloat(DataObject$9.FData,8);
      } else if (DataObject$9.FName$3=="Data.IR") {
         $Assert(TStream.a$35(DataObject$9.FData)>0,"","");
         ItemCount$7 = (Self.FNumberOfMeasurements*Self.FNumberOfReceivers*Self.FNumberOfDataSamples)*8;
         $Assert(TStream.a$35(DataObject$9.FData)==ItemCount$7,"","");
         $ArraySetLenC(Self.FImpulseResponses,Self.FNumberOfMeasurements,function (){return []});
         var $temp22;
         for(MeasurementIndex=0,$temp22=Self.FNumberOfMeasurements;MeasurementIndex<$temp22;MeasurementIndex++) {
            $ArraySetLenC(Self.FImpulseResponses[MeasurementIndex],Self.FNumberOfReceivers,function (){return []});
            var $temp23;
            for(ReceiverIndex=0,$temp23=Self.FNumberOfReceivers;ReceiverIndex<$temp23;ReceiverIndex++) {
               $ArraySetLen(Self.FImpulseResponses[MeasurementIndex][ReceiverIndex],Self.FNumberOfDataSamples,0);
               var $temp24;
               for(Index$17=0,$temp24=Self.FNumberOfDataSamples;Index$17<$temp24;Index$17++) {
                  Self.FImpulseResponses[MeasurementIndex][ReceiverIndex][Index$17]=TStream.ReadFloat(DataObject$9.FData,8);
               }
            }
         }
      } else if (DataObject$9.FName$3=="Data.SamplingRate") {
         $Assert(TStream.a$35(DataObject$9.FData)>0,"","");
         ItemCount$8 = $Div(TStream.a$35(DataObject$9.FData),DataObject$9.FDataType$4.FSize);
         var $temp25;
         for(Index$18=0,$temp25=ItemCount$8;Index$18<$temp25;Index$18++) {
            SampleRate$1 = TStream.ReadFloat(DataObject$9.FData,8);
            Self.FSampleRate.push(SampleRate$1);
         }
      } else if (DataObject$9.FName$3=="Data.Delay") {
         $Assert(TStream.a$35(DataObject$9.FData)>0,"","");
         ItemCount$9 = $Div(TStream.a$35(DataObject$9.FData),DataObject$9.FDataType$4.FSize);
         var $temp26;
         for(Index$19=0,$temp26=ItemCount$9;Index$19<$temp26;Index$19++) {
            Delay$1 = TStream.ReadFloat(DataObject$9.FData,8);
            Self.FDelay.push(Delay$1);
         }
      }
   }
   ,Destroy:TObject.Destroy
};
function Copy$TVector3(s,d) {
   d.X$2=s.X$2;
   d.Y$2=s.Y$2;
   d.Z=s.Z;
   return d;
}
function Clone$TVector3($) {
   return {
      X$2:$.X$2,
      Y$2:$.Y$2,
      Z:$.Z
   }
}
var Counter = 0;
var Application = null;
var CordovaAvailable = false;
var MainScreen = null;
var Application = TApplication.Create$175($New(TApplication));
TApplication.CreateElement(Application,TMainScreen);
TApplication.Run(Application);

