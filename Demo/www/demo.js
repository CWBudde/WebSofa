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
function RandomInt(i) { return Math.floor(Random()*i) }
/*

Copyright (C) 2010 by Johannes Baag�e <baagoe@baagoe.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

From http://baagoe.com/en/RandomMusings/javascript/
*/
function $alea() {
  return (function(args) {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (args.length == 0) {
      args = [+new Date];
    }
    var mash = function() {
       var n = 0xefc8249d;
    
       var mash = function(data) {
         data = data.toString();
         for (var i = 0; i < data.length; i++) {
           n += data.charCodeAt(i);
           var h = 0.02519603282416938 * n;
           n = h >>> 0;
           h -= n;
           h *= n;
           n = h >>> 0;
           h -= n;
           n += h * 0x100000000; // 2^32
         }
         return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
       };
    
       //mash.version = 'Mash 0.9';
       return mash;
    }();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(args[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(args[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    mash = null;

    var random = function() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
    /*random.uint32 = function() {
      return random() * 0x100000000; // 2^32
    };
    random.fract53 = function() {
      return random() +
        (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };*/
    //random.version = 'Alea 0.9';
    random.args = args;
    return random;

  } (Array.prototype.slice.call(arguments)));
};var Random = $alea();
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
function DegToRad(v) { return v*(Math.PI/180) }
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
function $Is(o,c) {
	if (o===null) return false;
	return $Inh(o.ClassType,c);
}
;
function $Inh(s,c) {
	if (s===null) return false;
	while ((s)&&(s!==c)) s=s.$Parent;
	return (s)?true:false;
}
;
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
function $As(o,c) {
	if ((o===null)||$Is(o,c)) return o;
	throw Exception.Create($New(Exception),"Cannot cast instance of type \""+o.ClassType.$ClassName+"\" to class \""+c.$ClassName+"\"");
}
function $ArraySetLenC(a,n,d) {
	var o=a.length;
	if (o==n) return;
	if (o>n) a.length=n; else for (;o<n;o++) a.push(d());
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
   ,Resize:function(Self) {
      /* null */
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
   ,Resize$:function($){return $.ClassType.Resize($)}
};
THtmlElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TCanvasElement = {
   $ClassName:"TCanvasElement",$Parent:THtmlElement
   ,$Init:function ($) {
      THtmlElement.$Init($);
   }
   ,ElementName:function(Self) {
      return "canvas";
   }
   ,a$31:function(Self) {
      return Self.FElement;
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158:THtmlElement.Create$158
   ,ElementName$:function($){return $.ElementName($)}
   ,Resize:THtmlElement.Resize
};
TCanvasElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TCanvas2DElement = {
   $ClassName:"TCanvas2DElement",$Parent:TCanvasElement
   ,$Init:function ($) {
      TCanvasElement.$Init($);
      $.FContext = null;
   }
   ,Create$158:function(Self, Owner$2) {
      THtmlElement.Create$158(Self,Owner$2);
      Self.FContext = TCanvasElement.a$31(Self).getContext("2d");
      return Self
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158$:function($){return $.ClassType.Create$158.apply($.ClassType, arguments)}
   ,ElementName:TCanvasElement.ElementName
   ,Resize:THtmlElement.Resize
};
TCanvas2DElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TPlane2D = {
   $ClassName:"TPlane2D",$Parent:TCanvas2DElement
   ,$Init:function ($) {
      TCanvas2DElement.$Init($);
   }
   ,Resize:function(Self) {
      var R = null,
         MinSize = 0;
      R = TCanvasElement.a$31(Self).getBoundingClientRect();
      MinSize = Math.round(Math.min(window.innerWidth-R.left,window.innerHeight-R.top));
      THtmlElement.a$1(Self).width = MinSize.toString()+"px";
      THtmlElement.a$1(Self).height = MinSize.toString()+"px";
      R = TCanvasElement.a$31(Self).getBoundingClientRect();
      TCanvasElement.a$31(Self).width = Math.round(Application.FPixelRatio*R.width);
      TCanvasElement.a$31(Self).height = Math.round(Application.FPixelRatio*R.height);
      TPlane2D.Paint(Self);
   }
   ,Paint:function(Self) {
      var Size$2 = 0,
         R$1 = 0;
      Size$2 = Math.min(TCanvasElement.a$31(Self).width,TCanvasElement.a$31(Self).height);
      Self.FContext.strokeStyle = "#CA3631";
      Self.FContext.lineWidth = 4;
      R$1 = 0.5*Size$2-Self.FContext.lineWidth;
      Self.FContext.beginPath();
      Self.FContext.arc(0.5*Size$2,0.5*Size$2,R$1,0,6.28318530717959,false);
      Self.FContext.stroke();
      Self.FContext.beginPath();
      Self.FContext.moveTo(0.5*Size$2,0.5*Size$2-0.07*R$1);
      Self.FContext.arc(0.5*Size$2,0.5*Size$2,0.05*R$1,-1.2707963267949,4.41238898038469,false);
      Self.FContext.closePath();
      Self.FContext.stroke();
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158:TCanvas2DElement.Create$158
   ,ElementName:TCanvasElement.ElementName
   ,Resize$:function($){return $.ClassType.Resize($)}
};
TPlane2D.$Intf={
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
   ,Resize:THtmlElement.Resize
};
TDivElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TMainScreen = {
   $ClassName:"TMainScreen",$Parent:TDivElement
   ,$Init:function ($) {
      TDivElement.$Init($);
      $.FGlyphs = [];
      $.FHeader = $.FHrtfs = $.FPlane2D = $.FSofaFile = $.FTextArea = null;
      $.FTracks = [];
   }
   ,AddText:function(Self, Text$8) {
      TTextAreaElement.a$2(Self.FTextArea,TTextAreaElement.a$3(Self.FTextArea)+Text$8+"\r");
   }
   ,Create$158:function(Self, Owner$3) {
      THtmlElement.Create$158(Self,Owner$3);
      MainScreen = Self;
      TDivElement.a$30(Self).id = "main";
      Self.FHeader = THtmlElement.Create$158$($New(THeader),$AsIntf(Self,"IHtmlElementOwner"));
      Self.FHeader.FFileSelect.OnLoad = function (Buffer) {
         TMainScreen.LoadSofaFile(Self,Buffer);
      };
      Self.FTextArea = THtmlElement.Create$158$($New(TTextAreaElement),$AsIntf(Self,"IHtmlElementOwner"));
      TTextAreaElement.a$4(Self.FTextArea).rows = 10;
      TTextAreaElement.a$4(Self.FTextArea).readOnly = true;
      TTextAreaElement.a$4(Self.FTextArea).placeholder = "please load any SOFA file first";
      Self.FPlane2D = THtmlElement.Create$158$($New(TPlane2D),$AsIntf(Self,"IHtmlElementOwner"));
      THtmlElement.Resize$(Self.FPlane2D);
      TCanvasElement.a$31(Self.FPlane2D).style.display = "none";
      window.addEventListener("resize",function () {
         THtmlElement.Resize$(Self.FPlane2D);
      },false);
      TMainScreen.InitializeAudioEngine(Self);
      return Self
   }
   ,InitializeAudioEngine:function(Self) {
      var a$38 = 0;
      var TrackName = "",
         Track = null;
      AudioContext.sampleRate = 44100;
      for(a$38=0;a$38<=3;a$38++) {
         TrackName = CTrackNames[a$38];
         Track = TTrack.Create$288($New(TTrack),TrackName,function (Sender) {
            /* null */
         });
         Track.FOnEnded = function (Sender$1) {
            $As(Sender$1,TTrack).FAudioBufferSource.start(AudioContext.currentTime);
         };
         Self.FTracks.push(Track);
         Self.FGlyphs.push(TGlyph.Create$266($New(TGlyph),$AsIntf(Self,"IHtmlElementOwner"),TrackName));
      }
   }
   ,LoadSofaFile:function(Self, Buffer$1) {
      Self.FSofaFile = TObject.Create($New(TSofaFile));
      TSofaFile.LoadFromBuffer(Self.FSofaFile,Buffer$1);
      TMainScreen.PrintFileInformation(Self);
      TMainScreen.PrepareHrtfs(Self);
   }
   ,PrepareHrtfs:function(Self) {
      Self.FHrtfs = THrtfs.Create$286($New(THrtfs),Self.FSofaFile);
      TMainScreen.RandomizeHrtfPositions(Self);
   }
   ,PrintFileInformation:function(Self) {
      TTextAreaElement.a$2(Self.FTextArea,"");
      if (Self.FSofaFile.FTitle!="") {
         TMainScreen.AddText(Self,"Title: "+Self.FSofaFile.FTitle);
      }
      if (Self.FSofaFile.FDataType!="") {
         TMainScreen.AddText(Self,"DataType: "+Self.FSofaFile.FDataType);
      }
      if (Self.FSofaFile.FRoomType!="") {
         TMainScreen.AddText(Self,"RoomType: "+Self.FSofaFile.FRoomType);
      }
      if (Self.FSofaFile.FRoomLocation!="") {
         TMainScreen.AddText(Self,"RoomLocation: "+Self.FSofaFile.FRoomLocation);
      }
      if (Self.FSofaFile.FDateCreated!="") {
         TMainScreen.AddText(Self,"DateCreated: "+Self.FSofaFile.FDateCreated);
      }
      if (Self.FSofaFile.FDateModified!="") {
         TMainScreen.AddText(Self,"DateModified: "+Self.FSofaFile.FDateModified);
      }
      if (Self.FSofaFile.FAPIName!="") {
         TMainScreen.AddText(Self,"APIName: "+Self.FSofaFile.FAPIName);
      }
      if (Self.FSofaFile.FAPIVersion!="") {
         TMainScreen.AddText(Self,"APIVersion: "+Self.FSofaFile.FAPIVersion);
      }
      if (Self.FSofaFile.FAuthorContact!="") {
         TMainScreen.AddText(Self,"AuthorContact: "+Self.FSofaFile.FAuthorContact);
      }
      if (Self.FSofaFile.FOrganization!="") {
         TMainScreen.AddText(Self,"Organization: "+Self.FSofaFile.FOrganization);
      }
      if (Self.FSofaFile.FLicense!="") {
         TMainScreen.AddText(Self,"License: "+Self.FSofaFile.FLicense);
      }
      if (Self.FSofaFile.FApplicationName!="") {
         TMainScreen.AddText(Self,"ApplicationName: "+Self.FSofaFile.FApplicationName);
      }
      if (Self.FSofaFile.FApplicationVersion!="") {
         TMainScreen.AddText(Self,"ApplicationVersion: "+Self.FSofaFile.FApplicationVersion);
      }
      if (Self.FSofaFile.FComment!="") {
         TMainScreen.AddText(Self,"Comment: "+Self.FSofaFile.FComment);
      }
      if (Self.FSofaFile.FHistory!="") {
         TMainScreen.AddText(Self,"History: "+Self.FSofaFile.FHistory);
      }
      if (Self.FSofaFile.FReferences!="") {
         TMainScreen.AddText(Self,"References: "+Self.FSofaFile.FReferences);
      }
      if (Self.FSofaFile.FOrigin!="") {
         TMainScreen.AddText(Self,"Origin: "+Self.FSofaFile.FOrigin);
      }
      TMainScreen.AddText(Self,"");
      TMainScreen.AddText(Self,"Number of Measurements: "+Self.FSofaFile.FNumberOfMeasurements.toString());
      TMainScreen.AddText(Self,"Number of Receivers: "+Self.FSofaFile.FNumberOfReceivers.toString());
      TMainScreen.AddText(Self,"Number of Emitters: "+Self.FSofaFile.FNumberOfEmitters.toString());
      TMainScreen.AddText(Self,"Number of DataSamples: "+Self.FSofaFile.FNumberOfDataSamples.toString());
      TMainScreen.AddText(Self,"SampleRate: "+TSofaFile.GetSampleRate(Self.FSofaFile,0).toString());
      TMainScreen.AddText(Self,"Delay: "+TSofaFile.GetDelay(Self.FSofaFile,0).toString());
   }
   ,RandomizeHrtfPositions:function(Self) {
      var StartTime = 0,
         a$39 = 0;
      var Track$1 = null,
         Index = 0,
         CurrentPosition = {X$2:0,Y$2:0,Z:0},
         a$40 = 0;
      var Glyph = null,
         R$2 = null,
         Scale = 0;
      var a$41 = [];
      THtmlElement.a$1(Self.FPlane2D).removeProperty("display");
      StartTime = AudioContext.currentTime;
      a$41 = Self.FTracks;
      var $temp1;
      for(a$39=0,$temp1=a$41.length;a$39<$temp1;a$39++) {
         Track$1 = a$41[a$39];
         var a$42 = [];
         Index = RandomInt(THrtfs.a$37(Self.FHrtfs));
         Copy$TVector3(THrtfs.GetMeasurement(Self.FHrtfs,Index).FPosition$1,CurrentPosition);
         a$42 = Self.FGlyphs;
         var $temp2;
         for(a$40=0,$temp2=a$42.length;a$40<$temp2;a$40++) {
            Glyph = a$42[a$40];
            if (Glyph.FName$1==Track$1.FText) {
               R$2 = TCanvasElement.a$31(Self.FPlane2D).getBoundingClientRect();
               Scale = Math.sqrt((Math.pow(CurrentPosition.X$2,2))+(Math.pow(CurrentPosition.Y$2,2)));
               THtmlElement.a$1(Glyph).removeProperty("display");
               THtmlElement.a$1(Glyph).left = (R$2.left+0.5*R$2.width-0.45*CurrentPosition.Y$2/Scale*R$2.width-16).toString()+"px";
               THtmlElement.a$1(Glyph).top = (R$2.top+0.5*R$2.height-0.45*CurrentPosition.X$2/Scale*R$2.height-16).toString()+"px";
            }
         }
         TTrack.FromHrtf(Track$1,Self.FHrtfs,Index);
         Track$1.FAudioBufferSource.start(StartTime);
      }
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158$:function($){return $.ClassType.Create$158.apply($.ClassType, arguments)}
   ,ElementName:TDivElement.ElementName
   ,Resize:THtmlElement.Resize
};
TMainScreen.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var THeader = {
   $ClassName:"THeader",$Parent:TDivElement
   ,$Init:function ($) {
      TDivElement.$Init($);
      $.FHeading = $.FFileSelect = null;
   }
   ,AfterConstructor:function(Self) {
      Self.FHeading = THtmlElement.Create$158$($New(TH1Element),$AsIntf(Self,"IHtmlElementOwner"));
      TCustomHeadingElement.a$27(Self.FHeading,"WebSofa Demo");
      Self.FFileSelect = THtmlElement.Create$158$($New(TFileSelect),$AsIntf(Self,"IHtmlElementOwner"));
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor$:function($){return $.ClassType.AfterConstructor($)}
   ,Create$158:THtmlElement.Create$158
   ,ElementName:TDivElement.ElementName
   ,Resize:THtmlElement.Resize
};
THeader.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TImageElement = {
   $ClassName:"TImageElement",$Parent:THtmlElement
   ,$Init:function ($) {
      THtmlElement.$Init($);
   }
   ,ElementName:function(Self) {
      return "img";
   }
   ,a$26:function(Self) {
      return Self.FElement;
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158:THtmlElement.Create$158
   ,ElementName$:function($){return $.ElementName($)}
   ,Resize:THtmlElement.Resize
};
TImageElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TGlyph = {
   $ClassName:"TGlyph",$Parent:TImageElement
   ,$Init:function ($) {
      TImageElement.$Init($);
      $.FName$1 = "";
   }
   ,Create$266:function(Self, Owner$4, TrackName$1) {
      THtmlElement.Create$158(Self,Owner$4);
      Self.FName$1 = TrackName$1;
      TImageElement.a$26(Self).src = "SVG\\"+TrackName$1+".svg";
      TImageElement.a$26(Self).style.display = "none";
      return Self
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158:THtmlElement.Create$158
   ,ElementName:TImageElement.ElementName
   ,Resize:THtmlElement.Resize
};
TGlyph.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TFileSelect = {
   $ClassName:"TFileSelect",$Parent:TDivElement
   ,$Init:function ($) {
      TDivElement.$Init($);
      $.FInputFile = $.OnLoad = null;
   }
   ,AfterConstructor:function(Self) {
      Self.FInputFile = THtmlElement.Create$158$($New(TInputFileElement),$AsIntf(Self,"IHtmlElementOwner"));
      TInputElement.a$21(Self.FInputFile).accept = ".sofa";
      TInputElement.a$21(Self.FInputFile).addEventListener("change",function (Event) {
         var Files = null,
            Reader = null;
         Files = Event.target.files;
         Reader = new FileReader();
         Reader.onload = function (_implicit_event) {
            var Result = undefined;
            if (Self.OnLoad) {
               Self.OnLoad(Reader.result);
            }
            Result = null;
            return Result
         };
         Reader.readAsArrayBuffer(Files[0]);
      },false);
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor$:function($){return $.ClassType.AfterConstructor($)}
   ,Create$158:THtmlElement.Create$158
   ,ElementName:TDivElement.ElementName
   ,Resize:THtmlElement.Resize
};
TFileSelect.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var CTrackNames = ["Vocal","Piano","Bass","Drums"];
var TStream = {
   $ClassName:"TStream",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FDataView = null;
      $.FPosition = 0;
   }
   ,a$36:function(Self) {
      return Self.FDataView.buffer.byteLength;
   }
   ,Clear$1:function(Self) {
      Self.FPosition = 0;
   }
   ,Create$272:function(Self, Buffer$2) {
      Self.FPosition = 0;
      Self.FDataView = new DataView(Buffer$2);
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
   ,Seek:function(Self, Position$2, IsRelative) {
      var Result = 0;
      Self.FPosition = Position$2+((IsRelative)?Self.FPosition:0);
      if (Self.FPosition>Self.FDataView.byteLength) {
         Self.FPosition = Self.FDataView.byteLength;
      }
      if (Self.FPosition>Self.FDataView.byteLength) {
         throw Exception.Create($New(Exception),"Invalid Position");
      }
      Result = Self.FPosition;
      return Result
   }
   ,WriteBuffer:function(Self, Buffer$3) {
      var OldBuffer = null,
         NewBuffer = null;
      OldBuffer = Self.FDataView.buffer;
      NewBuffer = new Uint8Array(OldBuffer.byteLength+Buffer$3.byteLength);
      NewBuffer.set(OldBuffer,0);
      NewBuffer.set(Buffer$3,OldBuffer.byteLength);
      Self.FDataView = new DataView(NewBuffer.buffer);
      Self.FPosition = NewBuffer.byteLength;
   }
   ,WriteInteger:function(Self, Count$4, Value$3) {
      switch (Count$4) {
         case 1 :
            Self.FDataView.setUint8(Self.FPosition,Value$3);
            break;
         case 2 :
            Self.FDataView.setUint16(Self.FPosition,Value$3);
            break;
         case 4 :
            Self.FDataView.setUint32(Self.FPosition,Value$3);
            break;
         default :
            throw Exception.Create($New(Exception),"Invalid count");
      }
      (Self.FPosition+= Count$4);
   }
   ,WriteString:function(Self, Value$4) {
      var Encoder = null;
      Encoder = new TextEncoder();
      TStream.WriteBuffer(Self,Encoder.encode(Value$4));
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
      if (Self.FEndOfFileAddress!=TStream.a$36(Stream)) {
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
   ,Create$273:function(Self, SuperBlock$3, DataObject$3) {
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
      var Index$1 = 0;
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
      var $temp3;
      for(Index$1=0,$temp3=Self.FFilters;Index$1<$temp3;Index$1++) {
         FilterIdentificationValue = TStream.ReadIntegerExcept(Stream$5,2);
         if (([1,2].indexOf(~FilterIdentificationValue)>=0)) {
            throw Exception.Create($New(Exception),"Unsupported filter");
         }
         Flags$1 = TStream.ReadIntegerExcept(Stream$5,2);
         NumberClientDataValues = TStream.ReadIntegerExcept(Stream$5,2);
         var $temp4;
         for(ValueIndex=0,$temp4=NumberClientDataValues;ValueIndex<$temp4;ValueIndex++) {
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
            Self.FDataType$1 = THdfBaseDataType.Create$278$($New(THdfDataTypeFixedPoint),Self);
            break;
         case 1 :
            Self.FDataType$1 = THdfBaseDataType.Create$278$($New(THdfDataTypeFloatingPoint),Self);
            break;
         case 2 :
            Self.FDataType$1 = THdfBaseDataType.Create$278$($New(THdfDataTypeTime),Self);
            break;
         case 3 :
            Self.FDataType$1 = THdfBaseDataType.Create$278$($New(THdfDataTypeString),Self);
            break;
         case 4 :
            Self.FDataType$1 = THdfBaseDataType.Create$278$($New(THdfDataTypeBitfield),Self);
            break;
         case 5 :
            Self.FDataType$1 = THdfBaseDataType.Create$278$($New(THdfDataTypeOpaque),Self);
            break;
         case 6 :
            Self.FDataType$1 = THdfBaseDataType.Create$278$($New(THdfDataTypeCompound),Self);
            break;
         case 7 :
            Self.FDataType$1 = THdfBaseDataType.Create$278$($New(THdfDataTypeReference),Self);
            break;
         case 8 :
            Self.FDataType$1 = THdfBaseDataType.Create$278$($New(THdfDataTypeEnumerated),Self);
            break;
         case 9 :
            Self.FDataType$1 = THdfBaseDataType.Create$278$($New(THdfDataTypeVariableLength),Self);
            break;
         case 10 :
            Self.FDataType$1 = THdfBaseDataType.Create$278$($New(THdfDataTypeArray),Self);
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
      var Index$2 = 0;
      var Size$3 = 0,
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
      var $temp5;
      for(Index$2=0,$temp5=Self.FDimensionality;Index$2<$temp5;Index$2++) {
         Size$3 = TStream.ReadIntegerExcept(Stream$7,Self.FSuperBlock.FLengthsSize);
         Self.FDimensionSize.push(Size$3);
      }
      if (Self.FFlags$2&1) {
         var $temp6;
         for(Index$2=0,$temp6=Self.FDimensionality;Index$2<$temp6;Index$2++) {
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
   ,ReadTree:function(Self, Stream$8, Size$4) {
      var Key = 0;
      var Start = [],
         Signature$1 = "",
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
      var $temp7;
      for(DimensionIndex=0,$temp7=Self.FDataObject.FDataSpace.FDimensionality;DimensionIndex<$temp7;DimensionIndex++) {
         Elements*=THdfDataObject.GetDataLayoutChunk(Self.FDataObject,DimensionIndex);
      }
      ElementSize = THdfDataObject.GetDataLayoutChunk(Self.FDataObject,Self.FDataObject.FDataSpace.FDimensionality);
      Output = new Uint8Array(Size$4);
      var $temp8;
      for(ElementIndex=0,$temp8=(EntriesUsed*2);ElementIndex<$temp8;ElementIndex++) {
         if (!NodeType) {
            Key = TStream.ReadIntegerExcept(Stream$8,Self.FSuperBlock.FLengthsSize);
         } else {
            ChunkSize = TStream.ReadIntegerExcept(Stream$8,4);
            FilterMask = TStream.ReadIntegerExcept(Stream$8,4);
            if (FilterMask) {
               throw Exception.Create($New(Exception),"All filters must be enabled");
            }
            Start.length=0;
            var $temp9;
            for(DimensionIndex$1=0,$temp9=Self.FDataObject.FDataSpace.FDimensionality;DimensionIndex$1<$temp9;DimensionIndex$1++) {
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
                  var $temp10;
                  for(ByteIndex=0,$temp10=(Elements*ElementSize);ByteIndex<$temp10;ByteIndex++) {
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
                  var $temp11;
                  for(ByteIndex$1=0,$temp11=(Elements*ElementSize);ByteIndex$1<$temp11;ByteIndex$1++) {
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
                  var $temp12;
                  for(ByteIndex$2=0,$temp12=(Elements*ElementSize);ByteIndex$2<$temp12;ByteIndex$2++) {
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
      var Index$3 = 0;
      var StreamPos$2 = 0;
      var Size$5 = 0;
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
            var $temp13;
            for(Index$3=0,$temp13=Self.FDimensionality$1;Index$3<$temp13;Index$3++) {
               DataLayoutChunk$1 = TStream.ReadIntegerExcept(Stream$9,4);
               Self.FDataObject.FDataLayoutChunk.push(DataLayoutChunk$1);
            }
            Size$5 = Self.FDataObject.FDataLayoutChunk[Self.FDimensionality$1-1];
            var $temp14;
            for(Index$3=0,$temp14=Self.FDataObject.FDataSpace.FDimensionality;Index$3<$temp14;Index$3++) {
               Size$5*=Self.FDataObject.FDataSpace.FDimensionSize[Index$3];
            }
            if (Self.FDataAddress>0&&Self.FDataAddress<Self.FSuperBlock.FEndOfFileAddress) {
               StreamPos$2 = Stream$9.FPosition;
               Stream$9.FPosition = Self.FDataAddress;
               THdfMessageDataLayout.ReadTree(Self,Stream$9,Size$5);
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
      $.FName$2 = "";
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
      Self.FName$2 = TStream.ReadStringExcept(Stream$12,Self.FNameSize);
      Self.FDatatypeMessage = THdfDataObjectMessage.Create$273($New(THdfMessageDataType),Self.FSuperBlock,Self.FDataObject);
      THdfDataObjectMessage.LoadFromStream$1$(Self.FDatatypeMessage,Stream$12);
      Self.FDataspaceMessage = THdfDataObjectMessage.Create$273($New(THdfMessageDataSpace),Self.FSuperBlock,Self.FDataObject);
      THdfDataObjectMessage.LoadFromStream$1$(Self.FDataspaceMessage,Stream$12);
      Attribute = THdfAttribute.Create$284($New(THdfAttribute),Self.FName$2);
      THdfDataObject.AddAttribute(Self.FDataObject,Attribute);
      if (!Self.FDataspaceMessage.FDimensionality) {
         THdfMessageAttribute.ReadData(Self,Stream$12,Attribute);
      } else {
         THdfMessageAttribute.ReadDataDimension(Self,Stream$12,Attribute,0);
      }
   }
   ,ReadData:function(Self, Stream$13, Attribute$1) {
      var Name$7 = {};
      Name$7.v = "";
      var Value$5 = 0;
      var Dimension$1 = 0;
      var EndAddress = 0;
      switch (Self.FDatatypeMessage.FDataClass) {
         case 3 :
            SetLength(Name$7,Self.FDatatypeMessage.FSize);
            Name$7.v = TStream.ReadStringExcept(Stream$13,Self.FDatatypeMessage.FSize);
            THdfAttribute.SetValueAsString(Attribute$1,Name$7.v);
            break;
         case 6 :
            TStream.Seek(Stream$13,Self.FDatatypeMessage.FSize,true);
            break;
         case 7 :
            Value$5 = TStream.ReadIntegerExcept(Stream$13,4);
            THdfAttribute.SetValueAsInteger(Attribute$1,Value$5);
            break;
         case 9 :
            Dimension$1 = TStream.ReadIntegerExcept(Stream$13,4);
            EndAddress = TStream.ReadIntegerExcept(Stream$13,4);
            Value$5 = TStream.ReadIntegerExcept(Stream$13,4);
            Value$5 = TStream.ReadIntegerExcept(Stream$13,4);
            break;
         default :
            throw Exception.Create($New(Exception),"Error: unknown data class");
      }
   }
   ,ReadDataDimension:function(Self, Stream$14, Attribute$2, Dimension$2) {
      var Index$4 = 0;
      if (Self.FDataspaceMessage.FDimensionSize.length>0) {
         var $temp15;
         for(Index$4=0,$temp15=Self.FDataspaceMessage.FDimensionSize[0];Index$4<$temp15;Index$4++) {
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
   ,Create$274:function(Self, SuperBlock$4, FractalHeap, DataObject$4) {
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
   ,Create$274$:function($){return $.ClassType.Create$274.apply($.ClassType, arguments)}
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
   ,Create$274:function(Self, SuperBlock$5, FractalHeap$1, DataObject$5) {
      THdfCustomBlock.Create$274(Self,SuperBlock$5,FractalHeap$1,DataObject$5);
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
            Block = THdfCustomBlock.Create$274$($New(THdfDirectBlock),Self.FSuperBlock$1,Self.FFractalHeap,Self.FDataObject$1);
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
            Block = THdfCustomBlock.Create$274$($New(THdfIndirectBlock),Self.FSuperBlock$1,Self.FFractalHeap,Self.FDataObject$1);
            THdfCustomBlock.LoadFromStream$12$(Block,Stream$16);
            Stream$16.FPosition = StreamPosition;
         }
         --n;
      }
   }
   ,Destroy:TObject.Destroy
   ,Create$274$:function($){return $.ClassType.Create$274.apply($.ClassType, arguments)}
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
   ,Create$276:function(Self, SuperBlock$6, DataObject$6) {
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
            Block$1 = THdfCustomBlock.Create$274$($New(THdfIndirectBlock),Self.FSuperBlock$2,Self,Self.FDataObject$2);
         } else {
            Block$1 = THdfCustomBlock.Create$274$($New(THdfDirectBlock),Self.FSuperBlock$2,Self,Self.FDataObject$2);
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
   ,Create$277:function(Self) {
      TObject.Create(Self);
      Self.FSuperBlock$3 = TObject.Create($New(THdfSuperBlock));
      Self.FDataObject$3 = THdfDataObject.Create$282($New(THdfDataObject),Self.FSuperBlock$3);
      return Self
   }
   ,GetAttribute:function(Self, Name$8) {
      return THdfDataObject.GetAttribute$1(Self.FDataObject$3,Name$8);
   }
   ,LoadFromBuffer$1:function(Self, Buffer$4) {
      THdfFile.LoadFromStream$15(Self,TStream.Create$272($New(TStream),Buffer$4));
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
      var HeapHeaderAddress = 0;
      var StreamPos$3 = 0;
      var SubDataObject = null;
      var OffsetX = 0,
         LengthX = 0,
         Temp = 0,
         Name$9 = "",
         ValueType = 0,
         TypeExtend = 0,
         Value$6 = "",
         Attribute$3 = null,
         Temp$1 = 0,
         Name$10 = "";
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
         OffsetX = TStream.ReadIntegerExcept(Stream$19,OffsetSize$1);
         LengthX = TStream.ReadIntegerExcept(Stream$19,LengthSize);
         if (TypeAndVersion==3) {
            Temp = TStream.ReadIntegerExcept(Stream$19,5);
            if (Temp!=262152) {
               throw Exception.Create($New(Exception),"Unsupported values");
            }
            Name$9 = TStream.ReadStringExcept(Stream$19,LengthX);
            Temp = TStream.ReadIntegerExcept(Stream$19,4);
            if (Temp!=19) {
               throw Exception.Create($New(Exception),"Unsupported values");
            }
            LengthX = TStream.ReadIntegerExcept(Stream$19,2);
            ValueType = TStream.ReadIntegerExcept(Stream$19,4);
            TypeExtend = TStream.ReadIntegerExcept(Stream$19,2);
            Value$6 = "";
            if (ValueType==131072&&(TypeExtend==0)) {
               Value$6 = TStream.ReadStringExcept(Stream$19,LengthX);
            }
            Attribute$3 = THdfAttribute.Create$284($New(THdfAttribute),Name$9);
            THdfAttribute.SetValueAsString(Attribute$3,Value$6);
            THdfDataObject.AddAttribute(Self.FDataObject$1,Attribute$3);
         } else if (TypeAndVersion==1) {
            Temp$1 = TStream.ReadIntegerExcept(Stream$19,6);
            if (Temp$1) {
               throw Exception.Create($New(Exception),"FHDB type 1 unsupported values");
            }
            LengthX = TStream.ReadIntegerExcept(Stream$19,1);
            Name$10 = TStream.ReadStringExcept(Stream$19,LengthX);
            HeapHeaderAddress = TStream.ReadIntegerExcept(Stream$19,Self.FSuperBlock$1.FOffsetSize);
            StreamPos$3 = Stream$19.FPosition;
            Stream$19.FPosition = HeapHeaderAddress;
            SubDataObject = THdfDataObject.Create$283($New(THdfDataObject),Self.FSuperBlock$1,Name$10);
            THdfDataObject.LoadFromStream$24(SubDataObject,Stream$19);
            THdfDataObject.AddDataObject(Self.FDataObject$1,SubDataObject);
            Stream$19.FPosition = StreamPos$3;
         }
      } while (!(TypeAndVersion==0));
   }
   ,Destroy:TObject.Destroy
   ,Create$274:THdfCustomBlock.Create$274
   ,GetSignature$:function($){return $.GetSignature($)}
   ,LoadFromStream$12$:function($){return $.ClassType.LoadFromStream$12.apply($.ClassType, arguments)}
};
var THdfBaseDataType = {
   $ClassName:"THdfBaseDataType",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FDataTypeMessage = null;
   }
   ,Create$278:function(Self, DatatypeMessage) {
      Self.FDataTypeMessage = DatatypeMessage;
      return Self
   }
   ,LoadFromStream$17:function(Self, Stream$20) {
      /* null */
   }
   ,Destroy:TObject.Destroy
   ,Create$278$:function($){return $.ClassType.Create$278.apply($.ClassType, arguments)}
   ,LoadFromStream$17$:function($){return $.ClassType.LoadFromStream$17.apply($.ClassType, arguments)}
};
var THdfDataTypeVariableLength = {
   $ClassName:"THdfDataTypeVariableLength",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
      $.FDataType$2 = null;
   }
   ,Create$278:function(Self, DatatypeMessage$1) {
      THdfBaseDataType.Create$278(Self,DatatypeMessage$1);
      Self.FDataType$2 = THdfDataObjectMessage.Create$273($New(THdfMessageDataType),Self.FDataTypeMessage.FSuperBlock,Self.FDataTypeMessage.FDataObject);
      return Self
   }
   ,LoadFromStream$17:function(Self, Stream$21) {
      THdfDataObjectMessage.LoadFromStream$1$(Self.FDataType$2,Stream$21);
   }
   ,Destroy:TObject.Destroy
   ,Create$278$:function($){return $.ClassType.Create$278.apply($.ClassType, arguments)}
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
   ,Create$278:THdfBaseDataType.Create$278
   ,LoadFromStream$17$:function($){return $.ClassType.LoadFromStream$17.apply($.ClassType, arguments)}
};
var THdfDataTypeString = {
   $ClassName:"THdfDataTypeString",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$278:THdfBaseDataType.Create$278
   ,LoadFromStream$17:THdfBaseDataType.LoadFromStream$17
};
var THdfDataTypeReference = {
   $ClassName:"THdfDataTypeReference",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$278:THdfBaseDataType.Create$278
   ,LoadFromStream$17:THdfBaseDataType.LoadFromStream$17
};
var THdfDataTypeOpaque = {
   $ClassName:"THdfDataTypeOpaque",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$278:THdfBaseDataType.Create$278
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
   ,Create$278:THdfBaseDataType.Create$278
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
   ,Create$278:THdfBaseDataType.Create$278
   ,LoadFromStream$17$:function($){return $.ClassType.LoadFromStream$17.apply($.ClassType, arguments)}
};
var THdfDataTypeEnumerated = {
   $ClassName:"THdfDataTypeEnumerated",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$278:THdfBaseDataType.Create$278
   ,LoadFromStream$17:THdfBaseDataType.LoadFromStream$17
};
var THdfDataTypeCompoundPart = {
   $ClassName:"THdfDataTypeCompoundPart",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FName$3 = "";
      $.FByteOffset = $.FSize$2 = 0;
      $.FDataType$3 = null;
   }
   ,Create$280:function(Self, DatatypeMessage$2) {
      Self.FDataType$3 = THdfDataObjectMessage.Create$273($New(THdfMessageDataType),DatatypeMessage$2.FSuperBlock,DatatypeMessage$2.FDataObject);
      Self.FSize$2 = DatatypeMessage$2.FSize;
      return Self
   }
   ,ReadFromStream:function(Self, Stream$25) {
      var ByteIndex$3 = 0;
      var ByteValue = 0;
      var Temp$2 = 0;
      Self.FName$3 = "";
      do {
         ByteValue = TStream.ReadIntegerExcept(Stream$25,1);
         Self.FName$3 = Self.FName$3+Chr(ByteValue);
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
   ,Create$278:function(Self, DatatypeMessage$3) {
      THdfBaseDataType.Create$278(Self,DatatypeMessage$3);
      return Self
   }
   ,LoadFromStream$17:function(Self, Stream$26) {
      var Index$5 = 0;
      var Count$5 = 0;
      var Part = null;
      if (Self.FDataTypeMessage.FVersion$1!=3) {
         throw Exception.Create($New(Exception),("Error unsupported compound version ("+Self.FDataTypeMessage.FVersion$1.toString()+")"));
      }
      Count$5 = (Self.FDataTypeMessage.FClassBitField[1]<<8)+Self.FDataTypeMessage.FClassBitField[0];
      var $temp16;
      for(Index$5=0,$temp16=Count$5;Index$5<$temp16;Index$5++) {
         Part = THdfDataTypeCompoundPart.Create$280($New(THdfDataTypeCompoundPart),Self.FDataTypeMessage);
         THdfDataTypeCompoundPart.ReadFromStream(Part,Stream$26);
         Self.FDataTypes.push(Part);
      }
   }
   ,Destroy:TObject.Destroy
   ,Create$278$:function($){return $.ClassType.Create$278.apply($.ClassType, arguments)}
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
   ,Create$278:THdfBaseDataType.Create$278
   ,LoadFromStream$17$:function($){return $.ClassType.LoadFromStream$17.apply($.ClassType, arguments)}
};
var THdfDataTypeArray = {
   $ClassName:"THdfDataTypeArray",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$278:THdfBaseDataType.Create$278
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
      $.FName$4 = "";
      $.FSignature$2 = "";
   }
   ,AddAttribute:function(Self, Attribute$4) {
      Self.FAttributeList.push(Attribute$4);
   }
   ,AddDataObject:function(Self, DataObject$7) {
      Self.FDataObjects.push(DataObject$7);
   }
   ,Create$283:function(Self, SuperBlock$7, Name$11) {
      THdfDataObject.Create$282(Self,SuperBlock$7);
      Self.FName$4 = Name$11;
      return Self
   }
   ,Create$282:function(Self, SuperBlock$8) {
      Self.FSuperBlock$4 = SuperBlock$8;
      Self.FName$4 = "";
      Self.FDataType$4 = THdfDataObjectMessage.Create$273($New(THdfMessageDataType),Self.FSuperBlock$4,Self);
      Self.FDataSpace = THdfDataObjectMessage.Create$273($New(THdfMessageDataSpace),Self.FSuperBlock$4,Self);
      Self.FLinkInfo = THdfDataObjectMessage.Create$273($New(THdfMessageLinkInfo),Self.FSuperBlock$4,Self);
      Self.FGroupInfo = THdfDataObjectMessage.Create$273($New(THdfMessageGroupInfo),Self.FSuperBlock$4,Self);
      Self.FAttributeInfo = THdfDataObjectMessage.Create$273($New(THdfMessageAttributeInfo),Self.FSuperBlock$4,Self);
      Self.FAttributesHeap = THdfFractalHeap.Create$276($New(THdfFractalHeap),Self.FSuperBlock$4,Self);
      Self.FObjectsHeap = THdfFractalHeap.Create$276($New(THdfFractalHeap),Self.FSuperBlock$4,Self);
      Self.FData = TStream.Create$272($New(TStream),new ArrayBuffer(0));
      return Self
   }
   ,GetAttribute$1:function(Self, Name$12) {
      var Result = "";
      var Index$6 = 0;
      Result = "";
      var $temp17;
      for(Index$6=0,$temp17=THdfDataObject.GetAttributeListCount(Self);Index$6<$temp17;Index$6++) {
         if (THdfDataObject.GetAttributeListItem(Self,Index$6).FName$5==Name$12) {
            return THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(Self,Index$6));
         }
      }
      return Result
   }
   ,GetAttributeListCount:function(Self) {
      return Self.FAttributeList.length;
   }
   ,GetAttributeListItem:function(Self, Index$7) {
      var Result = null;
      if (Index$7<0||Index$7>=Self.FAttributeList.length) {
         throw Exception.Create($New(Exception),("Index out of bounds ("+Index$7.toString()+")"));
      }
      Result = Self.FAttributeList[Index$7];
      return Result
   }
   ,GetDataLayoutChunk:function(Self, Index$8) {
      var Result = 0;
      if (Index$8<0||Index$8>=Self.FDataLayoutChunk.length) {
         throw Exception.Create($New(Exception),("Index out of bounds ("+Index$8.toString()+")"));
      }
      Result = Self.FDataLayoutChunk[Index$8];
      return Result
   }
   ,GetDataObject:function(Self, Index$9) {
      var Result = null;
      if (Index$9<0||Index$9>=Self.FDataObjects.length) {
         throw Exception.Create($New(Exception),("Index out of bounds ("+Index$9.toString()+")"));
      }
      Result = Self.FDataObjects[Index$9];
      return Result
   }
   ,GetDataObjectCount:function(Self) {
      return Self.FDataObjects.length;
   }
   ,HasAttribute$1:function(Self, Name$13) {
      var Result = false;
      var Index$10 = 0;
      Result = false;
      var $temp18;
      for(Index$10=0,$temp18=THdfDataObject.GetAttributeListCount(Self);Index$10<$temp18;Index$10++) {
         if (THdfDataObject.GetAttributeListItem(Self,Index$10).FName$5==Name$13) {
            return true;
         }
      }
      return Result
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
               DataObjectMessage = THdfDataObjectMessage.Create$273($New(THdfMessageDataFill),Self.FSuperBlock$4,Self);
               break;
            case 8 :
               DataObjectMessage = THdfDataObjectMessage.Create$273($New(THdfMessageDataLayout),Self.FSuperBlock$4,Self);
               break;
            case 10 :
               DataObjectMessage = Self.FGroupInfo;
               break;
            case 11 :
               DataObjectMessage = THdfDataObjectMessage.Create$273($New(THdfMessageFilterPipeline),Self.FSuperBlock$4,Self);
               break;
            case 12 :
               DataObjectMessage = THdfDataObjectMessage.Create$273($New(THdfMessageAttribute),Self.FSuperBlock$4,Self);
               break;
            case 16 :
               DataObjectMessage = THdfDataObjectMessage.Create$273($New(THdfMessageHeaderContinuation),Self.FSuperBlock$4,Self);
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
      $.FName$5 = "";
      $.FStream = null;
   }
   ,Create$284:function(Self, Name$14) {
      Self.FName$5 = Name$14;
      Self.FStream = TStream.Create$272($New(TStream),new ArrayBuffer(0));
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
      if (!TStream.a$36(Self.FStream)) {
         Result = "";
         return Result;
      }
      Self.FStream.FPosition = 0;
      Result = TStream.ReadStringExcept(Self.FStream,TStream.a$36(Self.FStream));
      return Result
   }
   ,SetValueAsInteger:function(Self, Value$7) {
      TStream.Clear$1(Self.FStream);
      TStream.WriteInteger(Self.FStream,4,Value$7);
   }
   ,SetValueAsString:function(Self, Value$8) {
      TStream.Clear$1(Self.FStream);
      TStream.WriteString(Self.FStream,Value$8);
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
      $.FAPIName = $.FAPIVersion = $.FApplicationName = $.FApplicationVersion = $.FAuthorContact = $.FComment = $.FDataType = $.FDateCreated = $.FDateModified = $.FHistory = $.FLicense = $.FOrganization = $.FOrigin = $.FReferences = $.FRoomLocation = $.FRoomType = $.FTitle = "";
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
   ,GetDelay:function(Self, Index$11) {
      var Result = 0;
      if (Index$11<0||Index$11>=Self.FDelay.length) {
         throw Exception.Create($New(Exception),("Index out of bounds ("+Index$11.toString()+")"));
      }
      Result = Self.FDelay[Index$11];
      return Result
   }
   ,GetImpulseResponse:function(Self, MeasurementIndex, ReceiverIndex) {
      return Self.FImpulseResponses[MeasurementIndex][ReceiverIndex];
   }
   ,GetSampleRate:function(Self, Index$12) {
      var Result = 0;
      if (Index$12<0||Index$12>=Self.FSampleRate.length) {
         throw Exception.Create($New(Exception),("Index out of bounds ("+Index$12.toString()+")"));
      }
      Result = Self.FSampleRate[Index$12];
      return Result
   }
   ,GetSourcePositions:function(Self, Index$13) {
      var Result = {X$2:0,Y$2:0,Z:0};
      if (Index$13<0||Index$13>=Self.FSourcePositions.length) {
         throw Exception.Create($New(Exception),("Index out of bounds ("+Index$13.toString()+")"));
      }
      Copy$TVector3(Self.FSourcePositions[Index$13],Result);
      return Result
   }
   ,LoadFromBuffer:function(Self, Buffer$5) {
      var HdfFile = null;
      var Index$14 = 0;
      HdfFile = THdfFile.Create$277($New(THdfFile));
      try {
         THdfFile.LoadFromBuffer$1(HdfFile,Buffer$5);
         if (THdfFile.GetAttribute(HdfFile,"Conventions")!="SOFA") {
            throw Exception.Create($New(Exception),"File does not contain the SOFA convention");
         }
         var $temp19;
         for(Index$14=0,$temp19=THdfDataObject.GetDataObjectCount(HdfFile.FDataObject$3);Index$14<$temp19;Index$14++) {
            TSofaFile.ReadDataObject(Self,THdfDataObject.GetDataObject(HdfFile.FDataObject$3,Index$14));
         }
         TSofaFile.ReadAttributes(Self,HdfFile.FDataObject$3);
      } finally {
         TObject.Free(HdfFile);
      }
   }
   ,ReadAttributes:function(Self, DataObject$8) {
      var Index$15 = 0;
      var Attribute$5 = null,
         AttributeName = "";
      var $temp20;
      for(Index$15=0,$temp20=THdfDataObject.GetAttributeListCount(DataObject$8);Index$15<$temp20;Index$15++) {
         Attribute$5 = THdfDataObject.GetAttributeListItem(DataObject$8,Index$15);
         AttributeName = Attribute$5.FName$5;
         if (AttributeName=="DateModified") {
            Self.FDateModified = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="History") {
            Self.FHistory = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="Comment") {
            Self.FComment = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="License") {
            Self.FLicense = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="APIVersion") {
            Self.FAPIVersion = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="APIName") {
            Self.FAPIName = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="Origin") {
            Self.FOrigin = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="Title") {
            Self.FTitle = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="DateCreated") {
            Self.FDateCreated = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="References") {
            Self.FReferences = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="DataType") {
            Self.FDataType = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="Organization") {
            Self.FOrganization = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="RoomLocation") {
            Self.FRoomLocation = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="RoomType") {
            Self.FRoomType = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="ApplicationVersion") {
            Self.FApplicationVersion = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="ApplicationName") {
            Self.FApplicationName = THdfAttribute.GetValueAsString(Attribute$5);
         }
         if (AttributeName=="AuthorContact") {
            Self.FAuthorContact = THdfAttribute.GetValueAsString(Attribute$5);
         }
      }
   }
   ,ReadDataObject:function(Self, DataObject$9) {
      var ItemCount = 0,
         ItemCount$1 = 0,
         ItemCount$2 = 0,
         ItemCount$3 = 0,
         IsCartesian = false,
         Index$16 = 0;
      var Position$3 = {X$2:0,Y$2:0,Z:0};
      var ItemCount$4 = 0,
         IsCartesian$1 = false,
         Index$17 = 0;
      var Position$4 = {X$2:0,Y$2:0,Z:0};
      var ItemCount$5 = 0,
         IsCartesian$2 = false,
         Index$18 = 0;
      var Position$5 = {X$2:0,Y$2:0,Z:0};
      var ItemCount$6 = 0,
         IsCartesian$3 = false,
         Index$19 = 0;
      var Position$6 = {X$2:0,Y$2:0,Z:0};
      var ItemCount$7 = 0,
         MeasurementIndex$1 = 0;
      var ReceiverIndex$1 = 0;
      var ImpulseResponse$1 = null,
         Index$20 = 0;
      var ItemCount$8 = 0,
         Index$21 = 0;
      var SampleRate$2 = 0,
         ItemCount$9 = 0,
         Index$22 = 0;
      var Delay$1 = 0;
      function ConvertPosition(Position$7) {
         var Result = {X$2:0,Y$2:0,Z:0};
         Result.X$2 = Position$7.Z*Math.cos(DegToRad(Position$7.Y$2))*Math.cos(DegToRad(Position$7.X$2));
         Result.Y$2 = Position$7.Z*Math.cos(DegToRad(Position$7.Y$2))*Math.sin(DegToRad(Position$7.X$2));
         Result.Z = Position$7.Z*Math.sin(DegToRad(Position$7.Y$2));
         return Result
      };
      function GetDimension$1(Text$9) {
         Text$9={v:Text$9};
         var Result = 0;
         var TextPos = 0;
         Result = 0;
         TextPos = (Text$9.v.indexOf("This is a netCDF dimension but not a netCDF variable.")+1);
         if (TextPos>0) {
            Delete(Text$9,TextPos,53);
            Result = parseInt(Trim$_String_(Text$9.v),10);
         }
         return Result
      };
      DataObject$9.FData.FPosition = 0;
      if (DataObject$9.FName$4=="M") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfMeasurements = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$4=="R") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfReceivers = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$4=="E") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfEmitters = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$4=="N") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfDataSamples = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$4=="S") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         ItemCount = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$4=="I") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         ItemCount$1 = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$4=="C") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$9,"CLASS")=="DIMENSION_SCALE","","");
         ItemCount$2 = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$9,"NAME"));
      } else if (DataObject$9.FName$4=="ListenerPosition") {
         $Assert(TStream.a$36(DataObject$9.FData)>0,"","");
         ItemCount$3 = $Div(TStream.a$36(DataObject$9.FData),3*DataObject$9.FDataType$4.FSize);
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         IsCartesian = true;
         if (THdfDataObject.HasAttribute$1(DataObject$9,"Type")) {
            IsCartesian = THdfDataObject.GetAttribute$1(DataObject$9,"Type")=="cartesian";
         }
         var $temp21;
         for(Index$16=0,$temp21=ItemCount$3;Index$16<$temp21;Index$16++) {
            Position$3.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$3.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$3.Z = TStream.ReadFloat(DataObject$9.FData,8);
            if (!(IsCartesian)) {
               Position$3 = ConvertPosition(Clone$TVector3(Position$3));
            }
            Self.FListenerPositions.push(Clone$TVector3(Position$3));
         }
      } else if (DataObject$9.FName$4=="ReceiverPosition") {
         $Assert(TStream.a$36(DataObject$9.FData)>0,"","");
         ItemCount$4 = $Div(TStream.a$36(DataObject$9.FData),3*DataObject$9.FDataType$4.FSize);
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         IsCartesian$1 = true;
         if (THdfDataObject.HasAttribute$1(DataObject$9,"Type")) {
            IsCartesian$1 = THdfDataObject.GetAttribute$1(DataObject$9,"Type")=="cartesian";
         }
         var $temp22;
         for(Index$17=0,$temp22=ItemCount$4;Index$17<$temp22;Index$17++) {
            Position$4.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$4.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$4.Z = TStream.ReadFloat(DataObject$9.FData,8);
            if (!(IsCartesian$1)) {
               Position$4 = ConvertPosition(Clone$TVector3(Position$4));
            }
            Self.FReceiverPositions.push(Clone$TVector3(Position$4));
         }
      } else if (DataObject$9.FName$4=="SourcePosition") {
         $Assert(TStream.a$36(DataObject$9.FData)>0,"","");
         ItemCount$5 = $Div(TStream.a$36(DataObject$9.FData),3*DataObject$9.FDataType$4.FSize);
         Self.FNumberOfSources = ItemCount$5;
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         IsCartesian$2 = true;
         if (THdfDataObject.HasAttribute$1(DataObject$9,"Type")) {
            IsCartesian$2 = THdfDataObject.GetAttribute$1(DataObject$9,"Type")=="cartesian";
         }
         var $temp23;
         for(Index$18=0,$temp23=ItemCount$5;Index$18<$temp23;Index$18++) {
            Position$5.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$5.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$5.Z = TStream.ReadFloat(DataObject$9.FData,8);
            if (!(IsCartesian$2)) {
               Position$5 = ConvertPosition(Clone$TVector3(Position$5));
            }
            Self.FSourcePositions.push(Clone$TVector3(Position$5));
         }
      } else if (DataObject$9.FName$4=="EmitterPosition") {
         $Assert(TStream.a$36(DataObject$9.FData)>0,"","");
         ItemCount$6 = $Div(TStream.a$36(DataObject$9.FData),3*DataObject$9.FDataType$4.FSize);
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         IsCartesian$3 = true;
         if (THdfDataObject.HasAttribute$1(DataObject$9,"Type")) {
            IsCartesian$3 = THdfDataObject.GetAttribute$1(DataObject$9,"Type")=="cartesian";
         }
         var $temp24;
         for(Index$19=0,$temp24=ItemCount$6;Index$19<$temp24;Index$19++) {
            Position$6.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$6.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Position$6.Z = TStream.ReadFloat(DataObject$9.FData,8);
            if (!(IsCartesian$3)) {
               Position$6 = ConvertPosition(Clone$TVector3(Position$6));
            }
            Self.FEmitterPositions.push(Clone$TVector3(Position$6));
         }
      } else if (DataObject$9.FName$4=="ListenerUp") {
         $Assert(TStream.a$36(DataObject$9.FData)>0,"","");
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         Self.FListenerUp.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
         Self.FListenerUp.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
         Self.FListenerUp.Z = TStream.ReadFloat(DataObject$9.FData,8);
      } else if (DataObject$9.FName$4=="ListenerView") {
         $Assert(TStream.a$36(DataObject$9.FData)>0,"","");
         $Assert(DataObject$9.FDataType$4.FDataClass==1,"","");
         Self.FListenerView.X$2 = TStream.ReadFloat(DataObject$9.FData,8);
         Self.FListenerView.Y$2 = TStream.ReadFloat(DataObject$9.FData,8);
         Self.FListenerView.Z = TStream.ReadFloat(DataObject$9.FData,8);
      } else if (DataObject$9.FName$4=="Data.IR") {
         $Assert(TStream.a$36(DataObject$9.FData)>0,"","");
         ItemCount$7 = (Self.FNumberOfMeasurements*Self.FNumberOfReceivers*Self.FNumberOfDataSamples)*8;
         $Assert(TStream.a$36(DataObject$9.FData)==ItemCount$7,"","");
         $ArraySetLenC(Self.FImpulseResponses,Self.FNumberOfMeasurements,function (){return []});
         var $temp25;
         for(MeasurementIndex$1=0,$temp25=Self.FNumberOfMeasurements;MeasurementIndex$1<$temp25;MeasurementIndex$1++) {
            $ArraySetLenC(Self.FImpulseResponses[MeasurementIndex$1],Self.FNumberOfReceivers,function (){return null});
            var $temp26;
            for(ReceiverIndex$1=0,$temp26=Self.FNumberOfReceivers;ReceiverIndex$1<$temp26;ReceiverIndex$1++) {
               ImpulseResponse$1 = new Float64Array(Self.FNumberOfDataSamples);
               var $temp27;
               for(Index$20=0,$temp27=Self.FNumberOfDataSamples;Index$20<$temp27;Index$20++) {
                  ImpulseResponse$1[Index$20]=TStream.ReadFloat(DataObject$9.FData,8);
               }
               Self.FImpulseResponses[MeasurementIndex$1][ReceiverIndex$1]=ImpulseResponse$1;
            }
         }
      } else if (DataObject$9.FName$4=="Data.SamplingRate") {
         $Assert(TStream.a$36(DataObject$9.FData)>0,"","");
         ItemCount$8 = $Div(TStream.a$36(DataObject$9.FData),DataObject$9.FDataType$4.FSize);
         var $temp28;
         for(Index$21=0,$temp28=ItemCount$8;Index$21<$temp28;Index$21++) {
            SampleRate$2 = TStream.ReadFloat(DataObject$9.FData,8);
            Self.FSampleRate.push(SampleRate$2);
         }
      } else if (DataObject$9.FName$4=="Data.Delay") {
         $Assert(TStream.a$36(DataObject$9.FData)>0,"","");
         ItemCount$9 = $Div(TStream.a$36(DataObject$9.FData),DataObject$9.FDataType$4.FSize);
         var $temp29;
         for(Index$22=0,$temp29=ItemCount$9;Index$22<$temp29;Index$22++) {
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
   ,a$2:function(Self, Value$9) {
      TTextAreaElement.a$4(Self).value = Value$9;
   }
   ,Create$158:function(Self, Owner$5) {
      THtmlElement.Create$158(Self,Owner$5);
      return Self
   }
   ,ElementName:function(Self) {
      return "textarea";
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158$:function($){return $.ClassType.Create$158.apply($.ClassType, arguments)}
   ,ElementName$:function($){return $.ElementName($)}
   ,Resize:THtmlElement.Resize
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
   ,Resize:THtmlElement.Resize
};
TInputElement.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TInputFileElement = {
   $ClassName:"TInputFileElement",$Parent:TInputElement
   ,$Init:function ($) {
      TInputElement.$Init($);
   }
   ,Create$158:function(Self, Owner$6) {
      THtmlElement.Create$158(Self,Owner$6);
      TInputElement.a$21(Self).type = "file";
      return Self
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158$:function($){return $.ClassType.Create$158.apply($.ClassType, arguments)}
   ,ElementName:TInputElement.ElementName
   ,Resize:THtmlElement.Resize
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
   ,a$27:function(Self, Value$10) {
      Self.FTextNode$4.data = Value$10;
   }
   ,Create$158:function(Self, Owner$7) {
      THtmlElement.Create$158(Self,Owner$7);
      Self.FTextNode$4 = document.createTextNode("");
      Self.FElement.appendChild(Self.FTextNode$4);
      return Self
   }
   ,Destroy:THtmlElement.Destroy
   ,AfterConstructor:THtmlElement.AfterConstructor
   ,Create$158$:function($){return $.ClassType.Create$158.apply($.ClassType, arguments)}
   ,ElementName:THtmlElement.ElementName
   ,Resize:THtmlElement.Resize
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
   ,Resize:THtmlElement.Resize
};
TH1Element.$Intf={
   IHtmlElementOwner:[THtmlElement.GetHtmlElement]
}
var TApplication = {
   $ClassName:"TApplication",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FElements = [];
      $.FPixelRatio = 0;
   }
   ,Create$175:function(Self) {
      document.addEventListener("deviceready",$Event0(Self,TApplication.DeviceReady),false);
      Self.FPixelRatio = 1;
      Self.FPixelRatio = window.devicePixelRatio || 1;
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
var TTrack = {
   $ClassName:"TTrack",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAudioBuffer = $.FAudioBufferSource = $.FConvolverNode = $.FOnEnded = $.FOnReady = null;
      $.FHrtfIndex = 0;
      $.FText = "";
   }
   ,Create$288:function(Self, Text$10, OnReady) {
      Self.FText = Text$10;
      Self.FOnReady = OnReady;
      Self.FConvolverNode = AudioContext.createConvolver();
      Self.FConvolverNode.normalize = false;
      Self.FConvolverNode.connect(AudioContext.destination);
      TTrack.RequestAudio(Self);
      return Self
   }
   ,FromHrtf:function(Self, Hrtfs, Index$23) {
      var HrtfBuffer = null,
         OfflineAudioContext = null;
      var Buffer$6 = null,
         BufferSource = null;
      HrtfBuffer = AudioContext.createBuffer(2,Hrtfs.FSampleFrames,AudioContext.sampleRate);
      HrtfBuffer.copyToChannel(THrtfs.GetMeasurement(Hrtfs,Index$23).FLeft,0);
      HrtfBuffer.copyToChannel(THrtfs.GetMeasurement(Hrtfs,Index$23).FRight,1);
      Self.FHrtfIndex = Index$23;
      if (AudioContext.sampleRate!=Hrtfs.FSampleRate$1) {
         var OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      OfflineAudioContext = new OfflineAudioContext(2, Hrtfs.FSampleFrames, AudioContext.sampleRate);
         Buffer$6 = AudioContext.createBuffer(2,Hrtfs.FSampleFrames,AudioContext.sampleRate);
         BufferSource = OfflineAudioContext.createBufferSource();
         BufferSource.buffer = HrtfBuffer;
         BufferSource.connect(OfflineAudioContext.destination);
         BufferSource.start(0);
         OfflineAudioContext.oncomplete = function (Event$1) {
            var Result = undefined;
            var OfflineAudioEvent = null;
            OfflineAudioEvent = Event$1;
            HrtfBuffer = OfflineAudioEvent.renderedBuffer;
            Result = false;
            return Result
         };
         OfflineAudioContext.startRendering();
      }
      $Assert(HrtfBuffer.sampleRate==AudioContext.sampleRate,"","");
      Self.FConvolverNode.buffer = HrtfBuffer;
   }
   ,RequestAudio:function(Self) {
      var Request = null;
      Request = new XMLHttpRequest();
      Request.open("GET","Audio\\"+Self.FText+".wav",true);
      Request.responseType = "arraybuffer";
      Request.onload = function (_implicit_event$1) {
         var Result = undefined;
         if (AudioContext) {
            AudioContext.decodeAudioData(Request.response,function (DecodedData) {
               Self.FAudioBuffer = DecodedData;
               TTrack.SetupAudioBufferNode(Self);
               if (Self.FOnReady) {
                  Self.FOnReady(Self);
               }
            },function (error$13) {
               console.log("Error loading file "+Self.FText);
            });
         } else {
            Result = false;
         }
         return Result
      };
      Request.onerror = function (_implicit_event$2) {
         var Result = undefined;
         console.log("Error loading file!");
         Result = false;
         return Result
      };
      Request.send();
   }
   ,SetupAudioBufferNode:function(Self) {
      Self.FAudioBufferSource = AudioContext.createBufferSource();
      Self.FAudioBufferSource.buffer = Self.FAudioBuffer;
      Self.FAudioBufferSource.connect(Self.FConvolverNode);
      Self.FAudioBufferSource.onended = function (_implicit_event$3) {
         var Result = undefined;
         TTrack.SetupAudioBufferNode(Self);
         if (Self.FOnEnded) {
            Self.FOnEnded(Self);
         }
         Result = false;
         return Result
      };
   }
   ,Destroy:TObject.Destroy
};
var THrtfs = {
   $ClassName:"THrtfs",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FMeasurements = [];
      $.FSampleFrames = 0;
      $.FSampleRate$1 = $.FScaleFactor = 0;
   }
   ,a$37:function(Self) {
      return Self.FMeasurements.length;
   }
   ,Create$286:function(Self, SofaFile) {
      var MinZ = 0,
         MeasurementIndex$2 = 0;
      var Position$8 = {X$2:0,Y$2:0,Z:0},
         MeasurementIndex$3 = 0;
      var GlobalMaxLevel = 0,
         a$43 = 0;
      var Measurement$1 = null,
         MaxLevel = 0;
      var a$44 = [];
      Self.FSampleFrames = SofaFile.FNumberOfDataSamples;
      Self.FSampleRate$1 = TSofaFile.GetSampleRate(SofaFile,0);
      $Assert(SofaFile.FNumberOfMeasurements==SofaFile.FNumberOfSources,"","");
      MinZ = Math.abs(TSofaFile.GetSourcePositions(SofaFile,0).Z);
      var $temp30;
      for(MeasurementIndex$2=1,$temp30=SofaFile.FNumberOfMeasurements;MeasurementIndex$2<$temp30;MeasurementIndex$2++) {
         Position$8 = TSofaFile.GetSourcePositions(SofaFile,MeasurementIndex$2);
         if (Math.abs(Position$8.Z)<MinZ) {
            MinZ = Math.abs(Position$8.Z);
         }
      }
      var $temp31;
      for(MeasurementIndex$3=0,$temp31=SofaFile.FNumberOfMeasurements;MeasurementIndex$3<$temp31;MeasurementIndex$3++) {
         if (Math.abs(TSofaFile.GetSourcePositions(SofaFile,MeasurementIndex$3).Z)>MinZ) {
            continue;
         }
         $Assert(SofaFile.FNumberOfReceivers>=2,"","");
         Self.FMeasurements.push(THrtfMeasurement.Create$287($New(THrtfMeasurement),TSofaFile.GetSourcePositions(SofaFile,MeasurementIndex$3),new Float32Array(TSofaFile.GetImpulseResponse(SofaFile,MeasurementIndex$3,0)),new Float32Array(TSofaFile.GetImpulseResponse(SofaFile,MeasurementIndex$3,1))));
      }
      GlobalMaxLevel = 0;
      a$44 = Self.FMeasurements;
      var $temp32;
      for(a$43=0,$temp32=a$44.length;a$43<$temp32;a$43++) {
         Measurement$1 = a$44[a$43];
         MaxLevel = THrtfMeasurement.GetMaxLevel(Measurement$1);
         if (MaxLevel>GlobalMaxLevel) {
            GlobalMaxLevel = MaxLevel;
         }
      }
      Self.FScaleFactor = (GlobalMaxLevel!=0)?1/GlobalMaxLevel:1;
      return Self
   }
   ,GetMeasurement:function(Self, Index$24) {
      var Result = null;
      if (Index$24<0&&Index$24>=Self.FMeasurements.length) {
         throw Exception.Create($New(Exception),"Index out of bounds");
      }
      Result = Self.FMeasurements[Index$24];
      return Result
   }
   ,Destroy:TObject.Destroy
};
var THrtfMeasurement = {
   $ClassName:"THrtfMeasurement",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FLeft = $.FRight = null;
      $.FPosition$1 = {X$2:0,Y$2:0,Z:0};
   }
   ,Create$287:function(Self, Position$9, Left$1, Right$1) {
      Copy$TVector3(Position$9,Self.FPosition$1);
      Self.FLeft = Left$1;
      Self.FRight = Right$1;
      return Self
   }
   ,GetMaxLevel:function(Self) {
      var Result = 0;
      var Index$25 = 0;
      var Index$26 = 0;
      Result = 0;
      var $temp33;
      for(Index$25=0,$temp33=Self.FLeft.length;Index$25<$temp33;Index$25++) {
         if (Math.abs(Self.FLeft[Index$25])>Result) {
            Result = Math.abs(Self.FLeft[Index$25]);
         }
      }
      var $temp34;
      for(Index$26=0,$temp34=Self.FRight.length;Index$26<$temp34;Index$26++) {
         if (Math.abs(Self.FRight[Index$26])>Result) {
            Result = Math.abs(Self.FRight[Index$26]);
         }
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
var Counter = 0;
var Application = null;
var CordovaAvailable = false;
var MainScreen = null;
var Application = TApplication.Create$175($New(TApplication));
var AudioContext = window.AudioContext || window.webkitAudioContext;
    AudioContext = new AudioContext();
;
TApplication.CreateElement(Application,TMainScreen);
TApplication.Run(Application);

