var $R = [
	"Index out of bounds (%d)",
	"File does not contain the SOFA convention",
	"All filters must be enabled",
	"Error reading dimensions",
	"Error seeking first object",
	"Error: unknown data class",
	"Error unsupported compound version (%d)",
	"FHDB type 1 unsupported values",
	"The base address should be zero",
	"Invalid count",
	"The file is not a valid HDF",
	"Invalid Position",
	"Invalid version",
	"Cannot handle huge objects",
	"Cannot handle tiny objects",
	"Position exceeds byte length",
	"Size mismatch",
	"The filter pipeline message has too many filters",
	"Unknown bit width",
	"Unknown datatype (%d)",
	"Unsupported bit precision",
	"Unsupported filter",
	"Unsupported OHDR message flag",
	"Unsupported values",
	"Unsupported version",
	"Unsupported version of attribute info message",
	"Unsupported version of data fill message",
	"Unsupported version of data layout message",
	"Unsupported version of dataspace message",
	"Unsupported version of data type message",
	"Unsupported version of fractal heap",
	"Unsupported version of group info message",
	"Unsupported version of link info message",
	"Unsupported version of custom block",
	"Unsupported version of message attribute",
	"Unsupported version of the filter pipeline message",
	"Wrong signature (%s)",
	"Only a block offset of 0 is supported so far"];
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
/**
sprintf() for JavaScript 0.7-beta1
http://www.diveintojavascript.com/projects/javascript-sprintf

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of sprintf() for JavaScript nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/

var sprintf = (function() {
	function get_type(variable) {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}
	function str_repeat(input, multiplier) {
		for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
		return output.join('');
	}

	var str_format = function() {
		if (!str_format.cache.hasOwnProperty(arguments[0])) {
			str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
		}
		return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
	};

	str_format.format = function(parse_tree, argv) {
		var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
		for (i = 0; i < tree_length; i++) {
			node_type = get_type(parse_tree[i]);
			if (node_type === 'string') {
				output.push(parse_tree[i]);
			}
			else if (node_type === 'array') {
				match = parse_tree[i]; // convenience purposes only
				if (match[2]) { // keyword argument
					arg = argv[cursor];
					for (k = 0; k < match[2].length; k++) {
						if (!arg.hasOwnProperty(match[2][k])) {
							throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
						}
						arg = arg[match[2][k]];
					}
				}
				else if (match[1]) { // positional argument (explicit)
					arg = argv[match[1]];
				}
				else { // positional argument (implicit)
					arg = argv[cursor++];
				}

				if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
					throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
				}
				switch (match[8]) {
					case 'b': arg = arg.toString(2); break;
					case 'c': arg = String.fromCharCode(arg); break;
					case 'd': arg = String(parseInt(arg, 10)); if (match[7]) { arg = str_repeat('0', match[7]-arg.length)+arg } break;
					case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
					case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
					case 'o': arg = arg.toString(8); break;
					case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
					case 'u': arg = Math.abs(arg); break;
					case 'x': arg = arg.toString(16); break;
					case 'X': arg = arg.toString(16).toUpperCase(); break;
				}
				arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
				pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
				pad_length = match[6] - String(arg).length;
				pad = match[6] ? str_repeat(pad_character, pad_length) : '';
				output.push(match[5] ? arg + pad : pad + arg);
			}
		}
		return output.join('');
	};

	str_format.cache = {};

	str_format.parse = function(fmt) {
		var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
		while (_fmt) {
			if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
				parse_tree.push(match[0]);
			}
			else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
				parse_tree.push('%');
			}
			else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
				if (match[2]) {
					arg_names |= 1;
					var field_list = [], replacement_field = match[2], field_match = [];
					if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
						field_list.push(field_match[1]);
						while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
							if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else {
								throw('[sprintf] huh?');
							}
						}
					}
					else {
						throw('[sprintf] huh?');
					}
					match[2] = field_list;
				}
				else {
					arg_names |= 2;
				}
				if (arg_names === 3) {
					throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
				}
				parse_tree.push(match);
			}
			else {
				throw('[sprintf] huh?');
			}
			_fmt = _fmt.substring(match[0].length);
		}
		return parse_tree;
	};

	return str_format;
})();
function Format(f,a) { a.unshift(f); return sprintf.apply(null,a) }
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
      var a$41 = 0;
      var TrackName = "",
         Track = null;
      AudioContext.sampleRate = 44100;
      for(a$41=0;a$41<=3;a$41++) {
         TrackName = CTrackNames[a$41];
         Track = TTrack.Create$291($New(TTrack),TrackName,function (Sender) {
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
      Self.FSofaFile = sofaLoadFile(Buffer$1);
      TMainScreen.PrintFileInformation(Self);
      TMainScreen.PrepareHrtfs(Self);
   }
   ,PrepareHrtfs:function(Self) {
      Self.FHrtfs = THrtfs.Create$289($New(THrtfs),Self.FSofaFile);
      TMainScreen.RandomizeHrtfPositions(Self);
   }
   ,PrintFileInformation:function(Self) {
      function PrintAttribute(Name$7) {
         if (Self.FSofaFile.FAttributes.has(Name$7)) {
            if (Self.FSofaFile.FAttributes.get(Name$7)!="") {
               TMainScreen.AddText(Self,Name$7+": "+Self.FSofaFile.FAttributes.get(Name$7));
            }
         }
      };
      TTextAreaElement.a$2(Self.FTextArea,"");
      PrintAttribute("Title");
      PrintAttribute("DataType");
      PrintAttribute("RoomType");
      PrintAttribute("RoomLocation");
      PrintAttribute("DateCreated");
      PrintAttribute("DateModified");
      PrintAttribute("APIName");
      PrintAttribute("APIVersion");
      PrintAttribute("AuthorContact");
      PrintAttribute("Organization");
      PrintAttribute("License");
      PrintAttribute("ApplicationName");
      PrintAttribute("Comment");
      PrintAttribute("History");
      PrintAttribute("References");
      PrintAttribute("Origin");
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
         a$42 = 0;
      var Track$1 = null,
         Index$2 = 0,
         CurrentPosition = [0,0,0],
         a$43 = 0;
      var Glyph = null,
         R$2 = null,
         Scale = 0;
      var a$44 = [];
      THtmlElement.a$1(Self.FPlane2D).removeProperty("display");
      StartTime = AudioContext.currentTime;
      a$44 = Self.FTracks;
      var $temp1;
      for(a$42=0,$temp1=a$44.length;a$42<$temp1;a$42++) {
         Track$1 = a$44[a$42];
         var a$45 = [];
         Index$2 = RandomInt(THrtfs.a$40(Self.FHrtfs));
         CurrentPosition = THrtfs.GetMeasurement(Self.FHrtfs,Index$2).FPosition$1.slice(0);
         a$45 = Self.FGlyphs;
         var $temp2;
         for(a$43=0,$temp2=a$45.length;a$43<$temp2;a$43++) {
            Glyph = a$45[a$43];
            if (Glyph.FName$1==Track$1.FText) {
               R$2 = TCanvasElement.a$31(Self.FPlane2D).getBoundingClientRect();
               Scale = Math.sqrt((Math.pow(CurrentPosition[0],2))+(Math.pow(CurrentPosition[1],2)));
               THtmlElement.a$1(Glyph).removeProperty("display");
               THtmlElement.a$1(Glyph).left = (R$2.left+0.5*R$2.width-0.45*CurrentPosition[1]/Scale*R$2.width-16).toString()+"px";
               THtmlElement.a$1(Glyph).top = (R$2.top+0.5*R$2.height-0.45*CurrentPosition[0]/Scale*R$2.height-16).toString()+"px";
            }
         }
         TTrack.FromHrtf(Track$1,Self.FHrtfs,Index$2);
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
   ,ReadBuffer:function(Self, Count$1) {
      var Result = null;
      if (Self.FPosition+Count$1>Self.FDataView.byteLength) {
         throw Exception.Create($New(Exception),$R[15]);
      }
      Result = new Uint8Array(Self.FDataView.buffer.slice(Self.FPosition,Self.FPosition+Count$1));
      (Self.FPosition+= Count$1);
      return Result
   }
   ,ReadFloat:function(Self, Count$2) {
      var Result = 0;
      if (Self.FPosition+Count$2>Self.FDataView.byteLength) {
         throw Exception.Create($New(Exception),$R[15]);
      }
      switch (Count$2) {
         case 4 :
            Result = Self.FDataView.getFloat32(Self.FPosition,true);
            break;
         case 8 :
            Result = Self.FDataView.getFloat64(Self.FPosition,true);
            break;
         default :
            throw Exception.Create($New(Exception),$R[18]);
      }
      (Self.FPosition+= Count$2);
      return Result
   }
   ,ReadInteger:function(Self, Count$3) {
      var Result = 0;
      if (Self.FPosition+Count$3>Self.FDataView.byteLength) {
         throw Exception.Create($New(Exception),$R[15]);
      }
      switch (Count$3) {
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
            throw Exception.Create($New(Exception),$R[18]);
      }
      (Self.FPosition+= Count$3);
      return Result
   }
   ,ReadString:function(Self, Count$4) {
      var Result = "";
      var Decoder = null;
      if (Self.FPosition+Count$4>Self.FDataView.byteLength) {
         throw Exception.Create($New(Exception),$R[15]);
      }
      Decoder = new TextDecoder();
      Result = Decoder.decode(Self.FDataView.buffer.slice(Self.FPosition,Self.FPosition+Count$4));
      if (!Result.charCodeAt(Result.length-1)) {
         Result = StrDeleteRight(Result,1);
      }
      (Self.FPosition+= Count$4);
      return Result
   }
   ,Seek:function(Self, Position$2, IsRelative) {
      var Result = 0;
      Self.FPosition = Position$2+((IsRelative)?Self.FPosition:0);
      if (Self.FPosition>Self.FDataView.byteLength) {
         Self.FPosition = Self.FDataView.byteLength;
      }
      if (Self.FPosition>Self.FDataView.byteLength) {
         throw Exception.Create($New(Exception),$R[11]);
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
   ,WriteInteger:function(Self, Count$5, Value$3) {
      switch (Count$5) {
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
            throw Exception.Create($New(Exception),$R[9]);
      }
      (Self.FPosition+= Count$5);
   }
   ,WriteString:function(Self, Value$4) {
      var Encoder = null;
      Encoder = new TextEncoder();
      TStream.WriteBuffer(Self,Encoder.encode(Value$4));
   }
   ,Destroy:TObject.Destroy
};
var TSofaPositions = {
   $ClassName:"TSofaPositions",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FIsSpherical = false;
      $.FPositions = [];
   }
   ,a$37:function(Self) {
      return Self.FPositions.length;
   }
   ,Create$273:function(Self, IsSpherical$1) {
      Self.FIsSpherical = IsSpherical$1;
      return Self
   }
   ,GetPosition$1:function(Self, Index$3) {
      var Result = [0,0,0];
      if (Index$3<0||Index$3>=Self.FPositions.length) {
         throw Exception.Create($New(Exception),Format($R[0],[Index$3]));
      }
      Result = Self.FPositions[Index$3].slice(0);
      return Result
   }
   ,GetPosition:function(Self, Index$4, Spherical) {
      var Result = [0,0,0];
      Result = TSofaPositions.GetPosition$1(Self,Index$4);
      if (Spherical!=Self.FIsSpherical) {
         if (Spherical) {
            Result = CartesianToSpherical(Result.slice(0));
         } else {
            Result = SphericalToCartesian(Result.slice(0));
         }
      }
      return Result
   }
   ,LoadFromStream:function(Self, Stream, DataSize) {
      var Index$5 = 0;
      var Position$3 = [0,0,0];
      $Assert(DataSize==8,"","");
      var $temp3;
      for(Index$5=0,$temp3=($Div(TStream.a$36(Stream),3*DataSize));Index$5<$temp3;Index$5++) {
         Position$3[0] = TStream.ReadFloat(Stream,DataSize);
         Position$3[1] = TStream.ReadFloat(Stream,DataSize);
         Position$3[2] = TStream.ReadFloat(Stream,DataSize);
         Self.FPositions.push(Position$3.slice(0));
      }
   }
   ,Destroy:TObject.Destroy
};
var TSofaFile = {
   $ClassName:"TSofaFile",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAttributes = $.FEmitterPositions = $.FListenerPositions = $.FReceiverPositions = $.FSourcePositions = null;
      $.FDelay = [];
      $.FImpulseResponses = [];
      $.FListenerUp = [0,0,0];
      $.FListenerView = [0,0,0];
      $.FNumberOfDataSamples = $.FNumberOfEmitters = $.FNumberOfListeners = $.FNumberOfMeasurements = $.FNumberOfReceivers = $.FNumberOfSources = 0;
      $.FSampleRate = [];
   }
   ,GetClosestIndexCartesian:function(Self, X$2, Y$2, Z) {
      var Result = 0;
      var CurrentPosition$1 = [0,0,0],
         Distance = 0,
         Index$6 = 0;
      var CurrentDistance = 0;
      Result = 0;
      CurrentPosition$1 = TSofaPositions.GetPosition(Self.FListenerPositions,0,false);
      Distance = Math.sqrt((Math.pow(X$2-CurrentPosition$1[0],2))+(Math.pow(Y$2-CurrentPosition$1[1],2))+(Math.pow(Z-CurrentPosition$1[1],2)));
      var $temp4;
      for(Index$6=1,$temp4=TSofaPositions.a$37(Self.FListenerPositions);Index$6<$temp4;Index$6++) {
         CurrentPosition$1 = TSofaPositions.GetPosition(Self.FListenerPositions,Index$6,false);
         CurrentDistance = Math.sqrt((Math.pow(X$2-CurrentPosition$1[0],2))+(Math.pow(Y$2-CurrentPosition$1[1],2))+(Math.pow(Z-CurrentPosition$1[1],2)));
         if (CurrentDistance<Distance) {
            Distance = CurrentDistance;
            Result = Index$6;
         }
      }
      return Result
   }
   ,GetClosestIndexSpherical:function(Self, Phi, Theta, Radius) {
      var Result = 0;
      var Position$4 = [0,0,0];
      Position$4[0] = Phi;
      Position$4[1] = Theta;
      Position$4[2] = Radius;
      Position$4 = SphericalToCartesian(Position$4.slice(0));
      Result = TSofaFile.GetClosestIndexCartesian(Self,Position$4[0],Position$4[1],Position$4[2]);
      return Result
   }
   ,GetDelay:function(Self, Index$7) {
      var Result = 0;
      if (Index$7<0||Index$7>=Self.FDelay.length) {
         throw Exception.Create($New(Exception),Format($R[0],[Index$7]));
      }
      Result = Self.FDelay[Index$7];
      return Result
   }
   ,GetDelayCount:function(Self) {
      return Self.FDelay.length;
   }
   ,GetImpulseResponse:function(Self, MeasurementIndex, ReceiverIndex) {
      return Self.FImpulseResponses[MeasurementIndex][ReceiverIndex];
   }
   ,GetSampleRate:function(Self, Index$8) {
      var Result = 0;
      if (Index$8<0||Index$8>=Self.FSampleRate.length) {
         throw Exception.Create($New(Exception),Format($R[0],[Index$8]));
      }
      Result = Self.FSampleRate[Index$8];
      return Result
   }
   ,GetSampleRateCount:function(Self) {
      return Self.FSampleRate.length;
   }
   ,LoadFromBuffer:function(Self, Buffer$4) {
      var HdfFile = null;
      var Index$9 = 0;
      var Index$10 = 0;
      var Attribute = null;
      HdfFile = THdfFile.Create$278($New(THdfFile));
      try {
         THdfFile.LoadFromBuffer$1(HdfFile,Buffer$4);
         if (THdfFile.GetAttribute(HdfFile,"Conventions")!="SOFA") {
            throw Exception.Create($New(Exception),$R[1]);
         }
         var $temp5;
         for(Index$9=0,$temp5=THdfDataObject.GetDataObjectCount(HdfFile.FDataObject$3);Index$9<$temp5;Index$9++) {
            TSofaFile.ReadDataObject(Self,THdfDataObject.GetDataObject(HdfFile.FDataObject$3,Index$9));
         }
         Self.FAttributes = new Map();
         var $temp6;
         for(Index$10=0,$temp6=THdfDataObject.GetAttributeListCount(HdfFile.FDataObject$3);Index$10<$temp6;Index$10++) {
            Attribute = THdfDataObject.GetAttributeListItem(HdfFile.FDataObject$3,Index$10);
            Self.FAttributes.set(Attribute.FName$5,THdfAttribute.GetValueAsString(Attribute));
         }
      } finally {
         TObject.Free(HdfFile);
      }
   }
   ,ReadDataObject:function(Self, DataObject$3) {
      var ItemCount = 0,
         ItemCount$1 = 0,
         ItemCount$2 = 0,
         IsSpherical$2 = false,
         IsSpherical$3 = false,
         IsSpherical$4 = false,
         IsSpherical$5 = false,
         ItemCount$3 = 0,
         MeasurementIndex$1 = 0;
      var ReceiverIndex$1 = 0;
      var ImpulseResponse$1 = null,
         Index$11 = 0;
      var ItemCount$4 = 0,
         Index$12 = 0;
      var SampleRate$5 = 0,
         ItemCount$5 = 0,
         Index$13 = 0;
      var Delay$1 = 0;
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
      DataObject$3.FData.FPosition = 0;
      if (DataObject$3.FName$4=="M") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$3,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfMeasurements = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$3,"NAME"));
      } else if (DataObject$3.FName$4=="R") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$3,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfReceivers = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$3,"NAME"));
      } else if (DataObject$3.FName$4=="E") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$3,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfEmitters = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$3,"NAME"));
      } else if (DataObject$3.FName$4=="N") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$3,"CLASS")=="DIMENSION_SCALE","","");
         Self.FNumberOfDataSamples = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$3,"NAME"));
      } else if (DataObject$3.FName$4=="S") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$3,"CLASS")=="DIMENSION_SCALE","","");
         ItemCount = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$3,"NAME"));
      } else if (DataObject$3.FName$4=="I") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$3,"CLASS")=="DIMENSION_SCALE","","");
         ItemCount$1 = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$3,"NAME"));
      } else if (DataObject$3.FName$4=="C") {
         $Assert(THdfDataObject.GetAttribute$1(DataObject$3,"CLASS")=="DIMENSION_SCALE","","");
         ItemCount$2 = GetDimension$1(THdfDataObject.GetAttribute$1(DataObject$3,"NAME"));
      } else if (DataObject$3.FName$4=="ListenerPosition") {
         $Assert(TStream.a$36(DataObject$3.FData)>0,"","");
         $Assert(DataObject$3.FDataType$3.FDataClass==1,"","");
         Self.FNumberOfListeners = $Div(TStream.a$36(DataObject$3.FData),3*DataObject$3.FDataType$3.FSize);
         IsSpherical$2 = false;
         if (THdfDataObject.HasAttribute$1(DataObject$3,"Type")) {
            IsSpherical$2 = THdfDataObject.GetAttribute$1(DataObject$3,"Type")=="spherical";
         }
         Self.FListenerPositions = TSofaPositions.Create$273($New(TSofaPositions),IsSpherical$2);
         TSofaPositions.LoadFromStream(Self.FListenerPositions,DataObject$3.FData,DataObject$3.FDataType$3.FSize);
      } else if (DataObject$3.FName$4=="ReceiverPosition") {
         $Assert(TStream.a$36(DataObject$3.FData)>0,"","");
         $Assert(DataObject$3.FDataType$3.FDataClass==1,"","");
         Self.FNumberOfReceivers = $Div(TStream.a$36(DataObject$3.FData),3*DataObject$3.FDataType$3.FSize);
         IsSpherical$3 = false;
         if (THdfDataObject.HasAttribute$1(DataObject$3,"Type")) {
            IsSpherical$3 = THdfDataObject.GetAttribute$1(DataObject$3,"Type")=="spherical";
         }
         Self.FReceiverPositions = TSofaPositions.Create$273($New(TSofaPositions),IsSpherical$3);
         TSofaPositions.LoadFromStream(Self.FReceiverPositions,DataObject$3.FData,DataObject$3.FDataType$3.FSize);
      } else if (DataObject$3.FName$4=="SourcePosition") {
         $Assert(TStream.a$36(DataObject$3.FData)>0,"","");
         $Assert(DataObject$3.FDataType$3.FDataClass==1,"","");
         Self.FNumberOfSources = $Div(TStream.a$36(DataObject$3.FData),3*DataObject$3.FDataType$3.FSize);
         IsSpherical$4 = false;
         if (THdfDataObject.HasAttribute$1(DataObject$3,"Type")) {
            IsSpherical$4 = THdfDataObject.GetAttribute$1(DataObject$3,"Type")=="spherical";
         }
         Self.FSourcePositions = TSofaPositions.Create$273($New(TSofaPositions),IsSpherical$4);
         TSofaPositions.LoadFromStream(Self.FSourcePositions,DataObject$3.FData,DataObject$3.FDataType$3.FSize);
      } else if (DataObject$3.FName$4=="EmitterPosition") {
         $Assert(TStream.a$36(DataObject$3.FData)>0,"","");
         $Assert(DataObject$3.FDataType$3.FDataClass==1,"","");
         Self.FNumberOfEmitters = $Div(TStream.a$36(DataObject$3.FData),3*DataObject$3.FDataType$3.FSize);
         IsSpherical$5 = false;
         if (THdfDataObject.HasAttribute$1(DataObject$3,"Type")) {
            IsSpherical$5 = THdfDataObject.GetAttribute$1(DataObject$3,"Type")=="spherical";
         }
         Self.FEmitterPositions = TSofaPositions.Create$273($New(TSofaPositions),IsSpherical$5);
         TSofaPositions.LoadFromStream(Self.FEmitterPositions,DataObject$3.FData,DataObject$3.FDataType$3.FSize);
      } else if (DataObject$3.FName$4=="ListenerUp") {
         $Assert(TStream.a$36(DataObject$3.FData)>0,"","");
         $Assert(DataObject$3.FDataType$3.FDataClass==1,"","");
         Self.FListenerUp[0] = TStream.ReadFloat(DataObject$3.FData,8);
         Self.FListenerUp[1] = TStream.ReadFloat(DataObject$3.FData,8);
         Self.FListenerUp[2] = TStream.ReadFloat(DataObject$3.FData,8);
      } else if (DataObject$3.FName$4=="ListenerView") {
         $Assert(TStream.a$36(DataObject$3.FData)>0,"","");
         $Assert(DataObject$3.FDataType$3.FDataClass==1,"","");
         Self.FListenerView[0] = TStream.ReadFloat(DataObject$3.FData,8);
         Self.FListenerView[1] = TStream.ReadFloat(DataObject$3.FData,8);
         Self.FListenerView[2] = TStream.ReadFloat(DataObject$3.FData,8);
      } else if (DataObject$3.FName$4=="Data.IR") {
         $Assert(TStream.a$36(DataObject$3.FData)>0,"","");
         ItemCount$3 = (Self.FNumberOfMeasurements*Self.FNumberOfReceivers*Self.FNumberOfDataSamples)*8;
         $Assert(TStream.a$36(DataObject$3.FData)==ItemCount$3,"","");
         $ArraySetLenC(Self.FImpulseResponses,Self.FNumberOfMeasurements,function (){return []});
         var $temp7;
         for(MeasurementIndex$1=0,$temp7=Self.FNumberOfMeasurements;MeasurementIndex$1<$temp7;MeasurementIndex$1++) {
            $ArraySetLenC(Self.FImpulseResponses[MeasurementIndex$1],Self.FNumberOfReceivers,function (){return null});
            var $temp8;
            for(ReceiverIndex$1=0,$temp8=Self.FNumberOfReceivers;ReceiverIndex$1<$temp8;ReceiverIndex$1++) {
               ImpulseResponse$1 = new Float64Array(Self.FNumberOfDataSamples);
               var $temp9;
               for(Index$11=0,$temp9=Self.FNumberOfDataSamples;Index$11<$temp9;Index$11++) {
                  ImpulseResponse$1[Index$11]=TStream.ReadFloat(DataObject$3.FData,8);
               }
               Self.FImpulseResponses[MeasurementIndex$1][ReceiverIndex$1]=ImpulseResponse$1;
            }
         }
      } else if (DataObject$3.FName$4=="Data.SamplingRate") {
         $Assert(TStream.a$36(DataObject$3.FData)>0,"","");
         ItemCount$4 = $Div(TStream.a$36(DataObject$3.FData),DataObject$3.FDataType$3.FSize);
         var $temp10;
         for(Index$12=0,$temp10=ItemCount$4;Index$12<$temp10;Index$12++) {
            SampleRate$5 = TStream.ReadFloat(DataObject$3.FData,8);
            Self.FSampleRate.push(SampleRate$5);
         }
      } else if (DataObject$3.FName$4=="Data.Delay") {
         $Assert(TStream.a$36(DataObject$3.FData)>0,"","");
         ItemCount$5 = $Div(TStream.a$36(DataObject$3.FData),DataObject$3.FDataType$3.FSize);
         var $temp11;
         for(Index$13=0,$temp11=ItemCount$5;Index$13<$temp11;Index$13++) {
            Delay$1 = TStream.ReadFloat(DataObject$3.FData,8);
            Self.FDelay.push(Delay$1);
         }
      }
   }
   ,Destroy:TObject.Destroy
};
var THdfSuperBlock = {
   $ClassName:"THdfSuperBlock",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FEndOfFileAddress = $.FLengthsSize = $.FOffsetSize = 0;
   }
   ,LoadFromStream$1:function(Self, Stream$1) {
      var Identifier = 0,
         FormatSignature = "",
         FormatSignatureVersion = 0,
         Version$1 = 0,
         ConsistencyFlag = 0,
         BaseAddress = 0,
         SuperBlockExtensionAddress = 0,
         RootGroupObjectHeaderAddress = 0,
         Checksum = 0;
      Identifier = TStream.ReadInteger(Stream$1,1);
      if (Identifier!=137) {
         throw Exception.Create($New(Exception),$R[10]);
      }
      FormatSignature = TStream.ReadString(Stream$1,3);
      if (FormatSignature!="HDF") {
         throw Exception.Create($New(Exception),$R[10]);
      }
      FormatSignatureVersion = TStream.ReadInteger(Stream$1,4);
      if (FormatSignatureVersion!=169478669) {
         throw Exception.Create($New(Exception),$R[10]);
      }
      Version$1 = TStream.ReadInteger(Stream$1,1);
      if (!((Version$1==2||Version$1==3))) {
         throw Exception.Create($New(Exception),$R[24]);
      }
      Self.FOffsetSize = TStream.ReadInteger(Stream$1,1);
      Self.FLengthsSize = TStream.ReadInteger(Stream$1,1);
      ConsistencyFlag = TStream.ReadInteger(Stream$1,1);
      BaseAddress = TStream.ReadInteger(Stream$1,Self.FOffsetSize);
      if (BaseAddress) {
         throw Exception.Create($New(Exception),$R[8]);
      }
      SuperBlockExtensionAddress = TStream.ReadInteger(Stream$1,Self.FOffsetSize);
      Self.FEndOfFileAddress = TStream.ReadInteger(Stream$1,Self.FOffsetSize);
      RootGroupObjectHeaderAddress = TStream.ReadInteger(Stream$1,Self.FOffsetSize);
      if (Self.FEndOfFileAddress!=TStream.a$36(Stream$1)) {
         throw Exception.Create($New(Exception),$R[16]);
      }
      Checksum = TStream.ReadInteger(Stream$1,4);
      if (TStream.Seek(Stream$1,RootGroupObjectHeaderAddress,false)!=RootGroupObjectHeaderAddress) {
         throw Exception.Create($New(Exception),$R[4]);
      }
   }
   ,Destroy:TObject.Destroy
};
var THdfDataObjectMessage = {
   $ClassName:"THdfDataObjectMessage",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FDataObject = $.FSuperBlock = null;
      $.FVersion = 0;
   }
   ,Create$274:function(Self, SuperBlock$3, DataObject$4) {
      Self.FSuperBlock = SuperBlock$3;
      Self.FDataObject = DataObject$4;
      return Self
   }
   ,LoadFromStream$2:function(Self, Stream$2) {
      Self.FVersion = TStream.ReadInteger(Stream$2,1);
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$2$:function($){return $.ClassType.LoadFromStream$2.apply($.ClassType, arguments)}
};
var THdfMessageLinkInfo = {
   $ClassName:"THdfMessageLinkInfo",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FFractalHeapAddress = 0;
   }
   ,LoadFromStream$2:function(Self, Stream$3) {
      var Flags$1 = 0,
         AddressBTreeIndex = 0;
      THdfDataObjectMessage.LoadFromStream$2(Self,Stream$3);
      if (Self.FVersion) {
         throw Exception.Create($New(Exception),$R[32]);
      }
      Flags$1 = TStream.ReadInteger(Stream$3,1);
      if (Flags$1&1) {
         TStream.ReadInteger(Stream$3,8);
      }
      Self.FFractalHeapAddress = TStream.ReadInteger(Stream$3,Self.FSuperBlock.FOffsetSize);
      AddressBTreeIndex = TStream.ReadInteger(Stream$3,Self.FSuperBlock.FOffsetSize);
      if (Flags$1&2) {
         TStream.ReadInteger(Stream$3,Self.FSuperBlock.FOffsetSize);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$2$:function($){return $.ClassType.LoadFromStream$2.apply($.ClassType, arguments)}
};
var THdfMessageHeaderContinuation = {
   $ClassName:"THdfMessageHeaderContinuation",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
   }
   ,LoadFromStream$2:function(Self, Stream$4) {
      var Offset = 0,
         LengthX = 0,
         StreamPos = 0,
         Signature = "";
      Offset = TStream.ReadInteger(Stream$4,Self.FSuperBlock.FOffsetSize);
      LengthX = TStream.ReadInteger(Stream$4,Self.FSuperBlock.FLengthsSize);
      StreamPos = Stream$4.FPosition;
      Stream$4.FPosition = Offset;
      Signature = TStream.ReadString(Stream$4,4);
      if (Signature!="OCHK") {
         throw Exception.Create($New(Exception),Format($R[36],[Signature]));
      }
      THdfDataObject.ReadObjectHeaderMessages(Self.FDataObject,Stream$4,Offset+LengthX);
      Stream$4.FPosition = StreamPos;
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$2$:function($){return $.ClassType.LoadFromStream$2.apply($.ClassType, arguments)}
};
var THdfMessageGroupInfo = {
   $ClassName:"THdfMessageGroupInfo",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
   }
   ,LoadFromStream$2:function(Self, Stream$5) {
      var Flags$2 = 0,
         MaximumCompact = 0,
         MinimumDense = 0,
         EstimatedNumberOfEntries = 0,
         EstimatedLinkNameLength = 0;
      THdfDataObjectMessage.LoadFromStream$2(Self,Stream$5);
      if (Self.FVersion) {
         throw Exception.Create($New(Exception),$R[31]);
      }
      Flags$2 = TStream.ReadInteger(Stream$5,1);
      if (Flags$2&1) {
         MaximumCompact = TStream.ReadInteger(Stream$5,2);
         MinimumDense = TStream.ReadInteger(Stream$5,2);
      }
      if (Flags$2&2) {
         EstimatedNumberOfEntries = TStream.ReadInteger(Stream$5,2);
         EstimatedLinkNameLength = TStream.ReadInteger(Stream$5,2);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$2$:function($){return $.ClassType.LoadFromStream$2.apply($.ClassType, arguments)}
};
var THdfMessageFilterPipeline = {
   $ClassName:"THdfMessageFilterPipeline",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
   }
   ,LoadFromStream$2:function(Self, Stream$6) {
      var Filters = 0,
         Index$14 = 0;
      var FilterIdentificationValue = 0,
         Flags$3 = 0,
         NumberClientDataValues = 0;
      THdfDataObjectMessage.LoadFromStream$2(Self,Stream$6);
      if (Self.FVersion!=2) {
         throw Exception.Create($New(Exception),$R[35]);
      }
      Filters = TStream.ReadInteger(Stream$6,1);
      if (Filters>32) {
         throw Exception.Create($New(Exception),$R[17]);
      }
      var $temp12;
      for(Index$14=0,$temp12=Filters;Index$14<$temp12;Index$14++) {
         FilterIdentificationValue = TStream.ReadInteger(Stream$6,2);
         if (([1,2].indexOf(~FilterIdentificationValue)>=0)) {
            throw Exception.Create($New(Exception),$R[21]);
         }
         Flags$3 = TStream.ReadInteger(Stream$6,2);
         NumberClientDataValues = TStream.ReadInteger(Stream$6,2);
         TStream.Seek(Stream$6,NumberClientDataValues*4,true);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$2$:function($){return $.ClassType.LoadFromStream$2.apply($.ClassType, arguments)}
};
var THdfMessageDataType = {
   $ClassName:"THdfMessageDataType",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FClassBitField = [0,0,0];
      $.FDataClass = $.FSize = 0;
      $.FDataType = null;
   }
   ,LoadFromStream$2:function(Self, Stream$7) {
      THdfDataObjectMessage.LoadFromStream$2(Self,Stream$7);
      Self.FDataClass = Self.FVersion&15;
      Self.FVersion = Self.FVersion>>>4;
      if (!((Self.FVersion==1||Self.FVersion==3))) {
         throw Exception.Create($New(Exception),$R[29]);
      }
      Self.FClassBitField[0] = TStream.ReadInteger(Stream$7,1);
      Self.FClassBitField[1] = TStream.ReadInteger(Stream$7,1);
      Self.FClassBitField[2] = TStream.ReadInteger(Stream$7,1);
      Self.FSize = TStream.ReadInteger(Stream$7,4);
      switch (Self.FDataClass) {
         case 0 :
            Self.FDataType = THdfBaseDataType.Create$279$($New(THdfDataTypeFixedPoint),Self);
            break;
         case 1 :
            Self.FDataType = THdfBaseDataType.Create$279$($New(THdfDataTypeFloatingPoint),Self);
            break;
         case 2 :
            Self.FDataType = THdfBaseDataType.Create$279$($New(THdfDataTypeTime),Self);
            break;
         case 3 :
            Self.FDataType = THdfBaseDataType.Create$279$($New(THdfDataTypeString),Self);
            break;
         case 4 :
            Self.FDataType = THdfBaseDataType.Create$279$($New(THdfDataTypeBitfield),Self);
            break;
         case 5 :
            Self.FDataType = THdfBaseDataType.Create$279$($New(THdfDataTypeOpaque),Self);
            break;
         case 6 :
            Self.FDataType = THdfBaseDataType.Create$279$($New(THdfDataTypeCompound),Self);
            break;
         case 7 :
            Self.FDataType = THdfBaseDataType.Create$279$($New(THdfDataTypeReference),Self);
            break;
         case 8 :
            Self.FDataType = THdfBaseDataType.Create$279$($New(THdfDataTypeEnumerated),Self);
            break;
         case 9 :
            Self.FDataType = THdfBaseDataType.Create$279$($New(THdfDataTypeVariableLength),Self);
            break;
         case 10 :
            Self.FDataType = THdfBaseDataType.Create$279$($New(THdfDataTypeArray),Self);
            break;
         default :
            throw Exception.Create($New(Exception),Format($R[19],[Self.FDataClass]));
      }
      if (Self.FDataType) {
         THdfBaseDataType.LoadFromStream$18$(Self.FDataType,Stream$7);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$2$:function($){return $.ClassType.LoadFromStream$2.apply($.ClassType, arguments)}
};
var THdfMessageDataSpace = {
   $ClassName:"THdfMessageDataSpace",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FDimensionality = $.FFlags = $.FType = 0;
      $.FDimensionMaxSize = [];
      $.FDimensionSize = [];
   }
   ,LoadFromStream$2:function(Self, Stream$8) {
      var Index$15 = 0;
      var Size$3 = 0,
         MaxSize = 0;
      THdfDataObjectMessage.LoadFromStream$2(Self,Stream$8);
      if (!((Self.FVersion==1||Self.FVersion==2))) {
         throw Exception.Create($New(Exception),$R[28]);
      }
      Self.FDimensionality = TStream.ReadInteger(Stream$8,1);
      Self.FFlags = TStream.ReadInteger(Stream$8,1);
      if (Self.FVersion==1) {
         TStream.Seek(Stream$8,5,true);
         throw Exception.Create($New(Exception),$R[28]);
      }
      Self.FType = TStream.ReadInteger(Stream$8,1);
      var $temp13;
      for(Index$15=0,$temp13=Self.FDimensionality;Index$15<$temp13;Index$15++) {
         Size$3 = TStream.ReadInteger(Stream$8,Self.FSuperBlock.FLengthsSize);
         Self.FDimensionSize.push(Size$3);
      }
      if (Self.FFlags&1) {
         var $temp14;
         for(Index$15=0,$temp14=Self.FDimensionality;Index$15<$temp14;Index$15++) {
            MaxSize = TStream.ReadInteger(Stream$8,Self.FSuperBlock.FLengthsSize);
            Self.FDimensionMaxSize.push(MaxSize);
         }
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$2$:function($){return $.ClassType.LoadFromStream$2.apply($.ClassType, arguments)}
};
var THdfMessageDataLayout = {
   $ClassName:"THdfMessageDataLayout",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FLayoutClass = $.FDataAddress = $.FDataSize = $.FDimensionality$1 = 0;
   }
   ,ReadTree:function(Self, Stream$9, Size$4) {
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
         throw Exception.Create($New(EHdfInvalidFormat),$R[3]);
      }
      Signature$1 = TStream.ReadString(Stream$9,4);
      if (Signature$1!="TREE") {
         throw Exception.Create($New(Exception),Format($R[36],[Signature$1]));
      }
      NodeType = TStream.ReadInteger(Stream$9,1);
      NodeLevel = TStream.ReadInteger(Stream$9,1);
      EntriesUsed = TStream.ReadInteger(Stream$9,2);
      AddressLeftSibling = TStream.ReadInteger(Stream$9,Self.FSuperBlock.FOffsetSize);
      AddressRightSibling = TStream.ReadInteger(Stream$9,Self.FSuperBlock.FOffsetSize);
      Elements = 1;
      var $temp15;
      for(DimensionIndex=0,$temp15=Self.FDataObject.FDataSpace.FDimensionality;DimensionIndex<$temp15;DimensionIndex++) {
         Elements*=THdfDataObject.GetDataLayoutChunk(Self.FDataObject,DimensionIndex);
      }
      ElementSize = THdfDataObject.GetDataLayoutChunk(Self.FDataObject,Self.FDataObject.FDataSpace.FDimensionality);
      Output = new Uint8Array(Size$4);
      var $temp16;
      for(ElementIndex=0,$temp16=(EntriesUsed*2);ElementIndex<$temp16;ElementIndex++) {
         if (!NodeType) {
            Key = TStream.ReadInteger(Stream$9,Self.FSuperBlock.FLengthsSize);
         } else {
            ChunkSize = TStream.ReadInteger(Stream$9,4);
            FilterMask = TStream.ReadInteger(Stream$9,4);
            if (FilterMask) {
               throw Exception.Create($New(Exception),$R[2]);
            }
            Start.length=0;
            var $temp17;
            for(DimensionIndex$1=0,$temp17=Self.FDataObject.FDataSpace.FDimensionality;DimensionIndex$1<$temp17;DimensionIndex$1++) {
               StartPos = TStream.ReadInteger(Stream$9,8);
               Start.push(StartPos);
            }
            BreakCondition = TStream.ReadInteger(Stream$9,8);
            if (BreakCondition) {
               break;
            }
            ChildPointer = TStream.ReadInteger(Stream$9,Self.FSuperBlock.FOffsetSize);
            StreamPos$1 = Stream$9.FPosition;
            Stream$9.FPosition = ChildPointer;
            ByteData = TStream.ReadBuffer(Stream$9,ChunkSize);
            Inflate = new Zlib.Inflate(ByteData);
            Input = Inflate.decompress();
            $Assert(Input.byteLength==Elements*ElementSize,"","");
            switch (Self.FDataObject.FDataSpace.FDimensionality) {
               case 1 :
                  sx = Self.FDataObject.FDataSpace.FDimensionSize[0];
                  var $temp18;
                  for(ByteIndex=0,$temp18=(Elements*ElementSize);ByteIndex<$temp18;ByteIndex++) {
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
                  var $temp19;
                  for(ByteIndex$1=0,$temp19=(Elements*ElementSize);ByteIndex$1<$temp19;ByteIndex$1++) {
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
                  var $temp20;
                  for(ByteIndex$2=0,$temp20=(Elements*ElementSize);ByteIndex$2<$temp20;ByteIndex$2++) {
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
            Stream$9.FPosition = StreamPos$1;
         }
      }
      TStream.WriteBuffer(Self.FDataObject.FData,Output);
      CheckSum = TStream.ReadInteger(Stream$9,4);
   }
   ,LoadFromStream$2:function(Self, Stream$10) {
      var Index$16 = 0;
      var StreamPos$2 = 0;
      var Size$5 = 0;
      var DataLayoutChunk$1 = 0;
      THdfDataObjectMessage.LoadFromStream$2(Self,Stream$10);
      if (Self.FVersion!=3) {
         throw Exception.Create($New(Exception),$R[27]);
      }
      Self.FLayoutClass = TStream.ReadInteger(Stream$10,1);
      switch (Self.FLayoutClass) {
         case 0 :
            Self.FDataSize = TStream.ReadInteger(Stream$10,2);
            TStream.WriteBuffer(Self.FDataObject.FData,TStream.ReadBuffer(Stream$10,Self.FDataSize));
            break;
         case 1 :
            Self.FDataAddress = TStream.ReadInteger(Stream$10,Self.FSuperBlock.FOffsetSize);
            Self.FDataSize = TStream.ReadInteger(Stream$10,Self.FSuperBlock.FLengthsSize);
            if (Self.FDataAddress>0) {
               StreamPos$2 = Stream$10.FPosition;
               Stream$10.FPosition = Self.FDataAddress;
               TStream.WriteBuffer(Self.FDataObject.FData,TStream.ReadBuffer(Stream$10,Self.FDataSize));
               Stream$10.FPosition = StreamPos$2;
            }
            break;
         case 2 :
            Self.FDimensionality$1 = TStream.ReadInteger(Stream$10,1);
            Self.FDataAddress = TStream.ReadInteger(Stream$10,Self.FSuperBlock.FOffsetSize);
            var $temp21;
            for(Index$16=0,$temp21=Self.FDimensionality$1;Index$16<$temp21;Index$16++) {
               DataLayoutChunk$1 = TStream.ReadInteger(Stream$10,4);
               Self.FDataObject.FDataLayoutChunk.push(DataLayoutChunk$1);
            }
            Size$5 = Self.FDataObject.FDataLayoutChunk[Self.FDimensionality$1-1];
            var $temp22;
            for(Index$16=0,$temp22=Self.FDataObject.FDataSpace.FDimensionality;Index$16<$temp22;Index$16++) {
               Size$5*=Self.FDataObject.FDataSpace.FDimensionSize[Index$16];
            }
            if (Self.FDataAddress>0&&Self.FDataAddress<Self.FSuperBlock.FEndOfFileAddress) {
               StreamPos$2 = Stream$10.FPosition;
               Stream$10.FPosition = Self.FDataAddress;
               THdfMessageDataLayout.ReadTree(Self,Stream$10,Size$5);
               Stream$10.FPosition = StreamPos$2;
            }
            break;
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$2$:function($){return $.ClassType.LoadFromStream$2.apply($.ClassType, arguments)}
};
var THdfMessageDataFill = {
   $ClassName:"THdfMessageDataFill",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
   }
   ,LoadFromStream$2:function(Self, Stream$11) {
      var Flags$4 = 0,
         Size$6 = 0;
      THdfDataObjectMessage.LoadFromStream$2(Self,Stream$11);
      if (Self.FVersion!=3) {
         throw Exception.Create($New(Exception),$R[26]);
      }
      Flags$4 = TStream.ReadInteger(Stream$11,1);
      if (Flags$4&(1<<5)) {
         Size$6 = TStream.ReadInteger(Stream$11,4);
         TStream.Seek(Stream$11,Size$6,true);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$2$:function($){return $.ClassType.LoadFromStream$2.apply($.ClassType, arguments)}
};
var THdfMessageAttributeInfo = {
   $ClassName:"THdfMessageAttributeInfo",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FFractalHeapAddress$1 = 0;
   }
   ,LoadFromStream$2:function(Self, Stream$12) {
      var Flags$5 = 0,
         AttributeNameBTreeAddress = 0;
      THdfDataObjectMessage.LoadFromStream$2(Self,Stream$12);
      if (Self.FVersion) {
         throw Exception.Create($New(Exception),$R[25]);
      }
      Flags$5 = TStream.ReadInteger(Stream$12,1);
      if (Flags$5&1) {
         TStream.ReadInteger(Stream$12,2);
      }
      Self.FFractalHeapAddress$1 = TStream.ReadInteger(Stream$12,Self.FSuperBlock.FOffsetSize);
      AttributeNameBTreeAddress = TStream.ReadInteger(Stream$12,Self.FSuperBlock.FOffsetSize);
      if (Flags$5&2) {
         TStream.ReadInteger(Stream$12,Self.FSuperBlock.FOffsetSize);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$2$:function($){return $.ClassType.LoadFromStream$2.apply($.ClassType, arguments)}
};
var THdfMessageAttribute = {
   $ClassName:"THdfMessageAttribute",$Parent:THdfDataObjectMessage
   ,$Init:function ($) {
      THdfDataObjectMessage.$Init($);
      $.FName$2 = "";
      $.FDatatypeMessage = $.FDataspaceMessage = null;
   }
   ,ReadData:function(Self, Stream$13, Attribute$1) {
      switch (Self.FDatatypeMessage.FDataClass) {
         case 3 :
            THdfAttribute.SetValueAsString(Attribute$1,TStream.ReadString(Stream$13,Self.FDatatypeMessage.FSize));
            break;
         case 6 :
            TStream.Seek(Stream$13,Self.FDatatypeMessage.FSize,true);
            break;
         case 7 :
            THdfAttribute.SetValueAsInteger(Attribute$1,TStream.ReadInteger(Stream$13,4));
            break;
         case 9 :
            TStream.Seek(Stream$13,16,true);
            break;
         default :
            throw Exception.Create($New(Exception),$R[5]);
      }
   }
   ,ReadDataDimension:function(Self, Stream$14, Attribute$2, Dimension$1) {
      var Index$17 = 0;
      if (Self.FDataspaceMessage.FDimensionSize.length>0) {
         var $temp23;
         for(Index$17=0,$temp23=Self.FDataspaceMessage.FDimensionSize[0];Index$17<$temp23;Index$17++) {
            if (1<Self.FDataspaceMessage.FDimensionality) {
               THdfMessageAttribute.ReadDataDimension(Self,Stream$14,Attribute$2,Dimension$1+1);
            } else {
               THdfMessageAttribute.ReadData(Self,Stream$14,Attribute$2);
            }
         }
      }
   }
   ,LoadFromStream$2:function(Self, Stream$15) {
      var Flags$6 = 0,
         NameSize = 0,
         DatatypeSize = 0,
         DataspaceSize = 0,
         Encoding = 0,
         Attribute$3 = null;
      THdfDataObjectMessage.LoadFromStream$2(Self,Stream$15);
      if (Self.FVersion!=3) {
         throw Exception.Create($New(Exception),$R[34]);
      }
      Flags$6 = TStream.ReadInteger(Stream$15,1);
      NameSize = TStream.ReadInteger(Stream$15,2);
      DatatypeSize = TStream.ReadInteger(Stream$15,2);
      DataspaceSize = TStream.ReadInteger(Stream$15,2);
      Encoding = TStream.ReadInteger(Stream$15,1);
      Self.FName$2 = TStream.ReadString(Stream$15,NameSize);
      Self.FDatatypeMessage = THdfDataObjectMessage.Create$274($New(THdfMessageDataType),Self.FSuperBlock,Self.FDataObject);
      THdfDataObjectMessage.LoadFromStream$2$(Self.FDatatypeMessage,Stream$15);
      Self.FDataspaceMessage = THdfDataObjectMessage.Create$274($New(THdfMessageDataSpace),Self.FSuperBlock,Self.FDataObject);
      THdfDataObjectMessage.LoadFromStream$2$(Self.FDataspaceMessage,Stream$15);
      Attribute$3 = THdfAttribute.Create$285($New(THdfAttribute),Self.FName$2);
      THdfDataObject.AddAttribute(Self.FDataObject,Attribute$3);
      if (!Self.FDataspaceMessage.FDimensionality) {
         THdfMessageAttribute.ReadData(Self,Stream$15,Attribute$3);
      } else {
         THdfMessageAttribute.ReadDataDimension(Self,Stream$15,Attribute$3,0);
      }
   }
   ,Destroy:TObject.Destroy
   ,LoadFromStream$2$:function($){return $.ClassType.LoadFromStream$2.apply($.ClassType, arguments)}
};
var THdfCustomBlock = {
   $ClassName:"THdfCustomBlock",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBlockOffset = $.FChecksum = 0;
      $.FDataObject$1 = $.FFractalHeap = $.FSuperBlock$1 = null;
   }
   ,Create$275:function(Self, SuperBlock$4, FractalHeap, DataObject$5) {
      Self.FSuperBlock$1 = SuperBlock$4;
      Self.FFractalHeap = FractalHeap;
      Self.FDataObject$1 = DataObject$5;
      return Self
   }
   ,LoadFromStream$13:function(Self, Stream$16) {
      var Signature$2 = "",
         Version$2 = 0,
         HeapHeaderAddress = 0;
      Signature$2 = TStream.ReadString(Stream$16,4);
      if (Signature$2!=THdfCustomBlock.GetSignature$(Self.ClassType)) {
         throw Exception.Create($New(Exception),Format($R[36],[Signature$2]));
      }
      Version$2 = TStream.ReadInteger(Stream$16,1);
      if (Version$2) {
         throw Exception.Create($New(Exception),$R[33]);
      }
      HeapHeaderAddress = TStream.ReadInteger(Stream$16,Self.FSuperBlock$1.FOffsetSize);
      Self.FBlockOffset = 0;
      Self.FBlockOffset = TStream.ReadInteger(Stream$16,$Div(Self.FFractalHeap.FMaximumHeapSize+7,8));
   }
   ,Destroy:TObject.Destroy
   ,Create$275$:function($){return $.ClassType.Create$275.apply($.ClassType, arguments)}
   ,GetSignature$:function($){return $.GetSignature($)}
   ,LoadFromStream$13$:function($){return $.ClassType.LoadFromStream$13.apply($.ClassType, arguments)}
};
var THdfIndirectBlock = {
   $ClassName:"THdfIndirectBlock",$Parent:THdfCustomBlock
   ,$Init:function ($) {
      THdfCustomBlock.$Init($);
      $.FInitialBlockSize = 0;
   }
   ,GetSignature:function(Self) {
      return "FHIB";
   }
   ,Create$275:function(Self, SuperBlock$5, FractalHeap$1, DataObject$6) {
      THdfCustomBlock.Create$275(Self,SuperBlock$5,FractalHeap$1,DataObject$6);
      Self.FInitialBlockSize = FractalHeap$1.FStartingBlockSize;
      return Self
   }
   ,LoadFromStream$13:function(Self, Stream$17) {
      var RowsCount = 0;
      var k = 0;
      var n = 0;
      var ChildBlockAddress = 0;
      var SizeOfFilteredDirectBlock = 0;
      var FilterMaskForDirectBlock = 0;
      var StreamPosition = 0;
      var Block = null;
      var MaximumNumberOfDirectBlockRows = 0;
      THdfCustomBlock.LoadFromStream$13(Self,Stream$17);
      if (Self.FBlockOffset) {
         throw Exception.Create($New(Exception),$R[37]);
      }
      RowsCount = Math.round(Log2(Self.FInitialBlockSize)-Log2(Self.FFractalHeap.FStartingBlockSize))+1;
      MaximumNumberOfDirectBlockRows = Math.round(Log2(Self.FFractalHeap.FMaximumDirectBlockSize)-Log2(Self.FFractalHeap.FStartingBlockSize))+2;
      if (RowsCount<MaximumNumberOfDirectBlockRows) {
         k = RowsCount*Self.FFractalHeap.FTableWidth;
      } else {
         k = MaximumNumberOfDirectBlockRows*Self.FFractalHeap.FTableWidth;
      }
      n = k-MaximumNumberOfDirectBlockRows*Self.FFractalHeap.FTableWidth;
      while (k>0) {
         ChildBlockAddress = 0;
         ChildBlockAddress = TStream.ReadInteger(Stream$17,Self.FSuperBlock$1.FOffsetSize);
         if (Self.FFractalHeap.FEncodedLength>0) {
            SizeOfFilteredDirectBlock = TStream.ReadInteger(Stream$17,Self.FSuperBlock$1.FLengthsSize);
            FilterMaskForDirectBlock = TStream.ReadInteger(Stream$17,4);
         }
         if (ChildBlockAddress>0&&ChildBlockAddress<Self.FSuperBlock$1.FEndOfFileAddress) {
            StreamPosition = Stream$17.FPosition;
            Stream$17.FPosition = ChildBlockAddress;
            Block = THdfCustomBlock.Create$275$($New(THdfDirectBlock),Self.FSuperBlock$1,Self.FFractalHeap,Self.FDataObject$1);
            THdfCustomBlock.LoadFromStream$13$(Block,Stream$17);
            Stream$17.FPosition = StreamPosition;
         }
         --k;
      }
      while (n>0) {
         ChildBlockAddress = 0;
         ChildBlockAddress = TStream.ReadInteger(Stream$17,Self.FSuperBlock$1.FOffsetSize);
         if (ChildBlockAddress>0&&ChildBlockAddress<Self.FSuperBlock$1.FEndOfFileAddress) {
            StreamPosition = Stream$17.FPosition;
            Stream$17.FPosition = ChildBlockAddress;
            Block = THdfCustomBlock.Create$275$($New(THdfIndirectBlock),Self.FSuperBlock$1,Self.FFractalHeap,Self.FDataObject$1);
            THdfCustomBlock.LoadFromStream$13$(Block,Stream$17);
            Stream$17.FPosition = StreamPosition;
         }
         --n;
      }
   }
   ,Destroy:TObject.Destroy
   ,Create$275$:function($){return $.ClassType.Create$275.apply($.ClassType, arguments)}
   ,GetSignature$:function($){return $.GetSignature($)}
   ,LoadFromStream$13$:function($){return $.ClassType.LoadFromStream$13.apply($.ClassType, arguments)}
};
var THdfFractalHeap = {
   $ClassName:"THdfFractalHeap",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAddressManagedBlock = $.FAmountAllocatedManagedSpace = $.FAmountFreeSpace = $.FAmountManagedSpace = $.FBtreeAddresses = $.FEncodedLength = $.FFlags$1 = $.FHeapIdLength = $.FMaximumDirectBlockSize = $.FMaximumHeapSize = $.FMaximumSize = $.FNextHugeID = $.FNumberOfHugeObjects = $.FNumberOfManagedObjects = $.FNumberOfTinyObjects = $.FOffsetDirectBlockAllocation = $.FSizeOfHugeObjects = $.FSizeOfTinyObjects = $.FStartingBlockSize = $.FTableWidth = $.FVersion$1 = 0;
      $.FDataObject$2 = $.FSuperBlock$2 = null;
      $.FSignature = "";
   }
   ,Create$277:function(Self, SuperBlock$6, DataObject$7) {
      Self.FSuperBlock$2 = SuperBlock$6;
      Self.FDataObject$2 = DataObject$7;
      return Self
   }
   ,LoadFromStream$15:function(Self, Stream$18) {
      var Block$1 = null;
      var StartingNumber = 0,
         AddressOfRootBlock = 0,
         CurrentNumberOfRows = 0;
      Self.FSignature = TStream.ReadString(Stream$18,4);
      if (Self.FSignature!="FRHP") {
         throw Exception.Create($New(Exception),Format($R[36],[Self.FSignature]));
      }
      Self.FVersion$1 = TStream.ReadInteger(Stream$18,1);
      if (Self.FVersion$1) {
         throw Exception.Create($New(Exception),$R[30]);
      }
      Self.FHeapIdLength = TStream.ReadInteger(Stream$18,2);
      Self.FEncodedLength = TStream.ReadInteger(Stream$18,2);
      Self.FFlags$1 = TStream.ReadInteger(Stream$18,1);
      Self.FMaximumSize = TStream.ReadInteger(Stream$18,4);
      Self.FNextHugeID = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FBtreeAddresses = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FOffsetSize);
      Self.FAmountFreeSpace = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FAddressManagedBlock = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FOffsetSize);
      Self.FAmountManagedSpace = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FAmountAllocatedManagedSpace = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FOffsetDirectBlockAllocation = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FNumberOfManagedObjects = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FSizeOfHugeObjects = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FNumberOfHugeObjects = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FSizeOfTinyObjects = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FNumberOfTinyObjects = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FTableWidth = TStream.ReadInteger(Stream$18,2);
      Self.FStartingBlockSize = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FMaximumDirectBlockSize = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FLengthsSize);
      Self.FMaximumHeapSize = TStream.ReadInteger(Stream$18,2);
      StartingNumber = TStream.ReadInteger(Stream$18,2);
      AddressOfRootBlock = TStream.ReadInteger(Stream$18,Self.FSuperBlock$2.FOffsetSize);
      CurrentNumberOfRows = TStream.ReadInteger(Stream$18,2);
      if (Self.FEncodedLength>0) {
         TStream.Seek(Stream$18,Self.FSuperBlock$2.FLengthsSize+4,true);
      }
      if (Self.FNumberOfHugeObjects>0) {
         throw Exception.Create($New(Exception),$R[13]);
      }
      if (Self.FNumberOfTinyObjects>0) {
         throw Exception.Create($New(Exception),$R[14]);
      }
      if (AddressOfRootBlock>0&&AddressOfRootBlock<Self.FSuperBlock$2.FEndOfFileAddress) {
         Stream$18.FPosition = AddressOfRootBlock;
         if (CurrentNumberOfRows) {
            Block$1 = THdfCustomBlock.Create$275$($New(THdfIndirectBlock),Self.FSuperBlock$2,Self,Self.FDataObject$2);
         } else {
            Block$1 = THdfCustomBlock.Create$275$($New(THdfDirectBlock),Self.FSuperBlock$2,Self,Self.FDataObject$2);
         }
         THdfCustomBlock.LoadFromStream$13$(Block$1,Stream$18);
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
   ,Create$278:function(Self) {
      TObject.Create(Self);
      Self.FSuperBlock$3 = TObject.Create($New(THdfSuperBlock));
      Self.FDataObject$3 = THdfDataObject.Create$283($New(THdfDataObject),Self.FSuperBlock$3);
      return Self
   }
   ,GetAttribute:function(Self, Name$8) {
      return THdfDataObject.GetAttribute$1(Self.FDataObject$3,Name$8);
   }
   ,LoadFromBuffer$1:function(Self, Buffer$5) {
      THdfFile.LoadFromStream$16(Self,TStream.Create$272($New(TStream),Buffer$5));
   }
   ,LoadFromStream$16:function(Self, Stream$19) {
      THdfSuperBlock.LoadFromStream$1(Self.FSuperBlock$3,Stream$19);
      THdfDataObject.LoadFromStream$25(Self.FDataObject$3,Stream$19);
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
   ,LoadFromStream$13:function(Self, Stream$20) {
      var OffsetSize$1 = 0;
      var LengthSize = 0;
      var TypeAndVersion = 0;
      var HeapHeaderAddress$1 = 0;
      var StreamPos$3 = 0;
      var SubDataObject = null;
      var OffsetX = 0,
         LengthX$1 = 0,
         Temp = 0,
         Name$9 = "",
         ValueType = 0,
         TypeExtend = 0,
         Value$5 = "",
         Attribute$4 = null,
         Temp$1 = 0,
         Name$10 = "";
      THdfCustomBlock.LoadFromStream$13(Self,Stream$20);
      if (Self.FFractalHeap.FFlags$1&2) {
         Self.FChecksum = TStream.ReadInteger(Stream$20,4);
      }
      OffsetSize$1 = Math.ceil(Log2(Self.FFractalHeap.FMaximumHeapSize)/8);
      if (Self.FFractalHeap.FMaximumDirectBlockSize<Self.FFractalHeap.FMaximumSize) {
         LengthSize = Math.ceil(Log2(Self.FFractalHeap.FMaximumDirectBlockSize)/8);
      } else {
         LengthSize = Math.ceil(Log2(Self.FFractalHeap.FMaximumSize)/8);
      }
      do {
         TypeAndVersion = TStream.ReadInteger(Stream$20,1);
         OffsetX = TStream.ReadInteger(Stream$20,OffsetSize$1);
         LengthX$1 = TStream.ReadInteger(Stream$20,LengthSize);
         if (TypeAndVersion==3) {
            Temp = TStream.ReadInteger(Stream$20,5);
            if (Temp!=262152) {
               throw Exception.Create($New(Exception),$R[23]);
            }
            Name$9 = TStream.ReadString(Stream$20,LengthX$1);
            Temp = TStream.ReadInteger(Stream$20,4);
            if (Temp!=19) {
               throw Exception.Create($New(Exception),$R[23]);
            }
            LengthX$1 = TStream.ReadInteger(Stream$20,2);
            ValueType = TStream.ReadInteger(Stream$20,4);
            TypeExtend = TStream.ReadInteger(Stream$20,2);
            Value$5 = "";
            if (ValueType==131072&&(TypeExtend==0)) {
               Value$5 = TStream.ReadString(Stream$20,LengthX$1);
            }
            Attribute$4 = THdfAttribute.Create$285($New(THdfAttribute),Name$9);
            THdfAttribute.SetValueAsString(Attribute$4,Value$5);
            THdfDataObject.AddAttribute(Self.FDataObject$1,Attribute$4);
         } else if (TypeAndVersion==1) {
            Temp$1 = TStream.ReadInteger(Stream$20,6);
            if (Temp$1) {
               throw Exception.Create($New(Exception),$R[7]);
            }
            LengthX$1 = TStream.ReadInteger(Stream$20,1);
            Name$10 = TStream.ReadString(Stream$20,LengthX$1);
            HeapHeaderAddress$1 = TStream.ReadInteger(Stream$20,Self.FSuperBlock$1.FOffsetSize);
            StreamPos$3 = Stream$20.FPosition;
            Stream$20.FPosition = HeapHeaderAddress$1;
            SubDataObject = THdfDataObject.Create$284($New(THdfDataObject),Self.FSuperBlock$1,Name$10);
            THdfDataObject.LoadFromStream$25(SubDataObject,Stream$20);
            THdfDataObject.AddDataObject(Self.FDataObject$1,SubDataObject);
            Stream$20.FPosition = StreamPos$3;
         }
      } while (!(TypeAndVersion==0));
   }
   ,Destroy:TObject.Destroy
   ,Create$275:THdfCustomBlock.Create$275
   ,GetSignature$:function($){return $.GetSignature($)}
   ,LoadFromStream$13$:function($){return $.ClassType.LoadFromStream$13.apply($.ClassType, arguments)}
};
var THdfBaseDataType = {
   $ClassName:"THdfBaseDataType",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FDataTypeMessage = null;
   }
   ,Create$279:function(Self, DatatypeMessage) {
      Self.FDataTypeMessage = DatatypeMessage;
      return Self
   }
   ,LoadFromStream$18:function(Self, Stream$21) {
      /* null */
   }
   ,Destroy:TObject.Destroy
   ,Create$279$:function($){return $.ClassType.Create$279.apply($.ClassType, arguments)}
   ,LoadFromStream$18$:function($){return $.ClassType.LoadFromStream$18.apply($.ClassType, arguments)}
};
var THdfDataTypeVariableLength = {
   $ClassName:"THdfDataTypeVariableLength",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
      $.FDataType$1 = null;
   }
   ,Create$279:function(Self, DatatypeMessage$1) {
      THdfBaseDataType.Create$279(Self,DatatypeMessage$1);
      Self.FDataType$1 = THdfDataObjectMessage.Create$274($New(THdfMessageDataType),Self.FDataTypeMessage.FSuperBlock,Self.FDataTypeMessage.FDataObject);
      return Self
   }
   ,LoadFromStream$18:function(Self, Stream$22) {
      THdfDataObjectMessage.LoadFromStream$2$(Self.FDataType$1,Stream$22);
   }
   ,Destroy:TObject.Destroy
   ,Create$279$:function($){return $.ClassType.Create$279.apply($.ClassType, arguments)}
   ,LoadFromStream$18$:function($){return $.ClassType.LoadFromStream$18.apply($.ClassType, arguments)}
};
var THdfDataTypeTime = {
   $ClassName:"THdfDataTypeTime",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,LoadFromStream$18:function(Self, Stream$23) {
      var BitPrecision = 0;
      BitPrecision = TStream.ReadInteger(Stream$23,2);
   }
   ,Destroy:TObject.Destroy
   ,Create$279:THdfBaseDataType.Create$279
   ,LoadFromStream$18$:function($){return $.ClassType.LoadFromStream$18.apply($.ClassType, arguments)}
};
var THdfDataTypeString = {
   $ClassName:"THdfDataTypeString",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$279:THdfBaseDataType.Create$279
   ,LoadFromStream$18:THdfBaseDataType.LoadFromStream$18
};
var THdfDataTypeReference = {
   $ClassName:"THdfDataTypeReference",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$279:THdfBaseDataType.Create$279
   ,LoadFromStream$18:THdfBaseDataType.LoadFromStream$18
};
var THdfDataTypeOpaque = {
   $ClassName:"THdfDataTypeOpaque",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$279:THdfBaseDataType.Create$279
   ,LoadFromStream$18:THdfBaseDataType.LoadFromStream$18
};
var THdfDataTypeFloatingPoint = {
   $ClassName:"THdfDataTypeFloatingPoint",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,LoadFromStream$18:function(Self, Stream$24) {
      var BitOffset = 0,
         BitPrecision$1 = 0,
         ExponentLocation = 0,
         ExponentSize = 0,
         MantissaLocation = 0,
         MantissaSize = 0,
         ExponentBias = 0;
      BitOffset = TStream.ReadInteger(Stream$24,2);
      BitPrecision$1 = TStream.ReadInteger(Stream$24,2);
      ExponentLocation = TStream.ReadInteger(Stream$24,1);
      ExponentSize = TStream.ReadInteger(Stream$24,1);
      MantissaLocation = TStream.ReadInteger(Stream$24,1);
      MantissaSize = TStream.ReadInteger(Stream$24,1);
      ExponentBias = TStream.ReadInteger(Stream$24,4);
      $Assert((BitOffset==0),"","");
      $Assert((MantissaLocation==0),"","");
      if (BitPrecision$1==32) {
         $Assert(ExponentLocation==23,"","");
         $Assert(ExponentSize==8,"","");
         $Assert(MantissaSize==23,"","");
         $Assert(ExponentBias==127,"","");
      } else if (BitPrecision$1==64) {
         $Assert(ExponentLocation==52,"","");
         $Assert(ExponentSize==11,"","");
         $Assert(MantissaSize==52,"","");
         $Assert(ExponentBias==1023,"","");
      } else {
         throw Exception.Create($New(Exception),$R[20]);
      }
   }
   ,Destroy:TObject.Destroy
   ,Create$279:THdfBaseDataType.Create$279
   ,LoadFromStream$18$:function($){return $.ClassType.LoadFromStream$18.apply($.ClassType, arguments)}
};
var THdfDataTypeFixedPoint = {
   $ClassName:"THdfDataTypeFixedPoint",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,LoadFromStream$18:function(Self, Stream$25) {
      var BitOffset$1 = 0,
         BitPrecision$2 = 0;
      THdfBaseDataType.LoadFromStream$18(Self,Stream$25);
      BitOffset$1 = TStream.ReadInteger(Stream$25,2);
      BitPrecision$2 = TStream.ReadInteger(Stream$25,2);
   }
   ,Destroy:TObject.Destroy
   ,Create$279:THdfBaseDataType.Create$279
   ,LoadFromStream$18$:function($){return $.ClassType.LoadFromStream$18.apply($.ClassType, arguments)}
};
var THdfDataTypeEnumerated = {
   $ClassName:"THdfDataTypeEnumerated",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$279:THdfBaseDataType.Create$279
   ,LoadFromStream$18:THdfBaseDataType.LoadFromStream$18
};
var THdfDataTypeCompoundPart = {
   $ClassName:"THdfDataTypeCompoundPart",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FName$3 = "";
      $.FByteOffset = $.FSize$1 = 0;
      $.FDataType$2 = null;
   }
   ,Create$281:function(Self, DatatypeMessage$2) {
      Self.FDataType$2 = THdfDataObjectMessage.Create$274($New(THdfMessageDataType),DatatypeMessage$2.FSuperBlock,DatatypeMessage$2.FDataObject);
      Self.FSize$1 = DatatypeMessage$2.FSize;
      return Self
   }
   ,ReadFromStream:function(Self, Stream$26) {
      var ByteIndex$3 = 0;
      var ByteValue = 0;
      var Temp$2 = 0;
      Self.FName$3 = "";
      do {
         ByteValue = TStream.ReadInteger(Stream$26,1);
         Self.FName$3 = Self.FName$3+Chr(ByteValue);
      } while (!(ByteValue==0));
      ByteIndex$3 = 0;
      do {
         Temp$2 = TStream.ReadInteger(Stream$26,1);
         Self.FByteOffset+=Temp$2<<(ByteIndex$3*8);
         ++ByteIndex$3;
      } while (!((1<<(ByteIndex$3*8))>Self.FSize$1));
      THdfDataObjectMessage.LoadFromStream$2$(Self.FDataType$2,Stream$26);
   }
   ,Destroy:TObject.Destroy
};
var THdfDataTypeCompound = {
   $ClassName:"THdfDataTypeCompound",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
      $.FDataTypes = [];
   }
   ,Create$279:function(Self, DatatypeMessage$3) {
      THdfBaseDataType.Create$279(Self,DatatypeMessage$3);
      return Self
   }
   ,LoadFromStream$18:function(Self, Stream$27) {
      var Index$18 = 0;
      var Count$6 = 0;
      var Part = null;
      if (Self.FDataTypeMessage.FVersion!=3) {
         throw Exception.Create($New(Exception),Format($R[6],[Self.FDataTypeMessage.FVersion]));
      }
      Count$6 = (Self.FDataTypeMessage.FClassBitField[1]<<8)+Self.FDataTypeMessage.FClassBitField[0];
      var $temp24;
      for(Index$18=0,$temp24=Count$6;Index$18<$temp24;Index$18++) {
         Part = THdfDataTypeCompoundPart.Create$281($New(THdfDataTypeCompoundPart),Self.FDataTypeMessage);
         THdfDataTypeCompoundPart.ReadFromStream(Part,Stream$27);
         Self.FDataTypes.push(Part);
      }
   }
   ,Destroy:TObject.Destroy
   ,Create$279$:function($){return $.ClassType.Create$279.apply($.ClassType, arguments)}
   ,LoadFromStream$18$:function($){return $.ClassType.LoadFromStream$18.apply($.ClassType, arguments)}
};
var THdfDataTypeBitfield = {
   $ClassName:"THdfDataTypeBitfield",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,LoadFromStream$18:function(Self, Stream$28) {
      var BitOffset$2 = 0,
         BitPrecision$3 = 0;
      BitOffset$2 = TStream.ReadInteger(Stream$28,2);
      BitPrecision$3 = TStream.ReadInteger(Stream$28,2);
   }
   ,Destroy:TObject.Destroy
   ,Create$279:THdfBaseDataType.Create$279
   ,LoadFromStream$18$:function($){return $.ClassType.LoadFromStream$18.apply($.ClassType, arguments)}
};
var THdfDataTypeArray = {
   $ClassName:"THdfDataTypeArray",$Parent:THdfBaseDataType
   ,$Init:function ($) {
      THdfBaseDataType.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Create$279:THdfBaseDataType.Create$279
   ,LoadFromStream$18:THdfBaseDataType.LoadFromStream$18
};
var THdfDataObject = {
   $ClassName:"THdfDataObject",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAttributeInfo = $.FAttributesHeap = $.FData = $.FDataSpace = $.FDataType$3 = $.FGroupInfo = $.FLinkInfo = $.FObjectsHeap = $.FSuperBlock$4 = null;
      $.FAttributeList = [];
      $.FChunkSize = $.FFlags$2 = 0;
      $.FDataLayoutChunk = [];
      $.FDataObjects = [];
      $.FName$4 = "";
   }
   ,AddAttribute:function(Self, Attribute$5) {
      Self.FAttributeList.push(Attribute$5);
   }
   ,AddDataObject:function(Self, DataObject$8) {
      Self.FDataObjects.push(DataObject$8);
   }
   ,Create$284:function(Self, SuperBlock$7, Name$11) {
      THdfDataObject.Create$283(Self,SuperBlock$7);
      Self.FName$4 = Name$11;
      return Self
   }
   ,Create$283:function(Self, SuperBlock$8) {
      Self.FSuperBlock$4 = SuperBlock$8;
      Self.FName$4 = "";
      Self.FDataType$3 = THdfDataObjectMessage.Create$274($New(THdfMessageDataType),Self.FSuperBlock$4,Self);
      Self.FDataSpace = THdfDataObjectMessage.Create$274($New(THdfMessageDataSpace),Self.FSuperBlock$4,Self);
      Self.FLinkInfo = THdfDataObjectMessage.Create$274($New(THdfMessageLinkInfo),Self.FSuperBlock$4,Self);
      Self.FGroupInfo = THdfDataObjectMessage.Create$274($New(THdfMessageGroupInfo),Self.FSuperBlock$4,Self);
      Self.FAttributeInfo = THdfDataObjectMessage.Create$274($New(THdfMessageAttributeInfo),Self.FSuperBlock$4,Self);
      Self.FAttributesHeap = THdfFractalHeap.Create$277($New(THdfFractalHeap),Self.FSuperBlock$4,Self);
      Self.FObjectsHeap = THdfFractalHeap.Create$277($New(THdfFractalHeap),Self.FSuperBlock$4,Self);
      Self.FData = TStream.Create$272($New(TStream),new ArrayBuffer(0));
      return Self
   }
   ,GetAttribute$1:function(Self, Name$12) {
      var Result = "";
      var Index$19 = 0;
      Result = "";
      var $temp25;
      for(Index$19=0,$temp25=THdfDataObject.GetAttributeListCount(Self);Index$19<$temp25;Index$19++) {
         if (THdfDataObject.GetAttributeListItem(Self,Index$19).FName$5==Name$12) {
            return THdfAttribute.GetValueAsString(THdfDataObject.GetAttributeListItem(Self,Index$19));
         }
      }
      return Result
   }
   ,GetAttributeListCount:function(Self) {
      return Self.FAttributeList.length;
   }
   ,GetAttributeListItem:function(Self, Index$20) {
      var Result = null;
      if (Index$20<0||Index$20>=Self.FAttributeList.length) {
         throw Exception.Create($New(Exception),Format($R[0],[Index$20]));
      }
      Result = Self.FAttributeList[Index$20];
      return Result
   }
   ,GetDataLayoutChunk:function(Self, Index$21) {
      var Result = 0;
      if (Index$21<0||Index$21>=Self.FDataLayoutChunk.length) {
         throw Exception.Create($New(Exception),Format($R[0],[Index$21]));
      }
      Result = Self.FDataLayoutChunk[Index$21];
      return Result
   }
   ,GetDataObject:function(Self, Index$22) {
      var Result = null;
      if (Index$22<0||Index$22>=Self.FDataObjects.length) {
         throw Exception.Create($New(Exception),Format($R[0],[Index$22]));
      }
      Result = Self.FDataObjects[Index$22];
      return Result
   }
   ,GetDataObjectCount:function(Self) {
      return Self.FDataObjects.length;
   }
   ,HasAttribute$1:function(Self, Name$13) {
      var Result = false;
      var Index$23 = 0;
      Result = false;
      var $temp26;
      for(Index$23=0,$temp26=THdfDataObject.GetAttributeListCount(Self);Index$23<$temp26;Index$23++) {
         if (THdfDataObject.GetAttributeListItem(Self,Index$23).FName$5==Name$13) {
            return true;
         }
      }
      return Result
   }
   ,LoadFromStream$25:function(Self, Stream$29) {
      var Signature$3 = "",
         Version$3 = 0,
         MaximumCompact$1 = 0,
         MinimumDense$1 = 0;
      Signature$3 = TStream.ReadString(Stream$29,4);
      if (Signature$3!="OHDR") {
         throw Exception.Create($New(Exception),Format($R[36],[Signature$3]));
      }
      Version$3 = TStream.ReadInteger(Stream$29,1);
      if (Version$3!=2) {
         throw Exception.Create($New(Exception),$R[12]);
      }
      Self.FFlags$2 = TStream.ReadInteger(Stream$29,1);
      if (Self.FFlags$2&(1<<5)) {
         TStream.Seek(Stream$29,16,true);
      }
      if (Self.FFlags$2&(1<<4)) {
         MaximumCompact$1 = TStream.ReadInteger(Stream$29,2);
         MinimumDense$1 = TStream.ReadInteger(Stream$29,2);
      }
      Self.FChunkSize = TStream.ReadInteger(Stream$29,1<<(Self.FFlags$2&3));
      THdfDataObject.ReadObjectHeaderMessages(Self,Stream$29,Stream$29.FPosition+Self.FChunkSize);
      if (Self.FAttributeInfo.FFractalHeapAddress$1>0&&Self.FAttributeInfo.FFractalHeapAddress$1<Self.FSuperBlock$4.FEndOfFileAddress) {
         Stream$29.FPosition = Self.FAttributeInfo.FFractalHeapAddress$1;
         THdfFractalHeap.LoadFromStream$15(Self.FAttributesHeap,Stream$29);
      }
      if (Self.FLinkInfo.FFractalHeapAddress>0&&Self.FLinkInfo.FFractalHeapAddress<Self.FSuperBlock$4.FEndOfFileAddress) {
         Stream$29.FPosition = Self.FLinkInfo.FFractalHeapAddress;
         THdfFractalHeap.LoadFromStream$15(Self.FObjectsHeap,Stream$29);
      }
   }
   ,ReadObjectHeaderMessages:function(Self, Stream$30, EndOfStream) {
      var MessageType = 0;
      var MessageSize = 0;
      var MessageFlags = 0;
      var EndPos = 0;
      var DataObjectMessage = null;
      while (Stream$30.FPosition<EndOfStream-4) {
         MessageType = TStream.ReadInteger(Stream$30,1);
         MessageSize = TStream.ReadInteger(Stream$30,2);
         MessageFlags = TStream.ReadInteger(Stream$30,1);
         if (MessageFlags&(~5)) {
            throw Exception.Create($New(Exception),$R[22]);
         }
         if (Self.FFlags$2&(1<<2)) {
            TStream.Seek(Stream$30,2,true);
         }
         EndPos = Stream$30.FPosition+MessageSize;
         DataObjectMessage = null;
         switch (MessageType) {
            case 0 :
               TStream.Seek(Stream$30,MessageSize,true);
               break;
            case 1 :
               DataObjectMessage = Self.FDataSpace;
               break;
            case 2 :
               DataObjectMessage = Self.FLinkInfo;
               break;
            case 3 :
               DataObjectMessage = Self.FDataType$3;
               break;
            case 5 :
               DataObjectMessage = THdfDataObjectMessage.Create$274($New(THdfMessageDataFill),Self.FSuperBlock$4,Self);
               break;
            case 8 :
               DataObjectMessage = THdfDataObjectMessage.Create$274($New(THdfMessageDataLayout),Self.FSuperBlock$4,Self);
               break;
            case 10 :
               DataObjectMessage = Self.FGroupInfo;
               break;
            case 11 :
               DataObjectMessage = THdfDataObjectMessage.Create$274($New(THdfMessageFilterPipeline),Self.FSuperBlock$4,Self);
               break;
            case 12 :
               DataObjectMessage = THdfDataObjectMessage.Create$274($New(THdfMessageAttribute),Self.FSuperBlock$4,Self);
               break;
            case 16 :
               DataObjectMessage = THdfDataObjectMessage.Create$274($New(THdfMessageHeaderContinuation),Self.FSuperBlock$4,Self);
               break;
            case 21 :
               DataObjectMessage = Self.FAttributeInfo;
               break;
            default :
               throw Exception.Create($New(Exception),("Unknown header message ("+MessageType.toString()+")"));
         }
         if (DataObjectMessage) {
            THdfDataObjectMessage.LoadFromStream$2$(DataObjectMessage,Stream$30);
         }
         if (Stream$30.FPosition!=EndPos) {
            $Assert(Stream$30.FPosition==EndPos,"","");
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
   ,Create$285:function(Self, Name$14) {
      Self.FName$5 = Name$14;
      Self.FStream = TStream.Create$272($New(TStream),new ArrayBuffer(0));
      return Self
   }
   ,GetValueAsInteger:function(Self) {
      var Result = 0;
      Self.FStream.FPosition = 0;
      Result = TStream.ReadInteger(Self.FStream,4);
      return Result
   }
   ,GetValueAsString:function(Self) {
      var Result = "";
      if (!TStream.a$36(Self.FStream)) {
         Result = "";
         return Result;
      }
      Self.FStream.FPosition = 0;
      Result = TStream.ReadString(Self.FStream,TStream.a$36(Self.FStream));
      return Result
   }
   ,SetValueAsInteger:function(Self, Value$6) {
      TStream.Clear$1(Self.FStream);
      TStream.WriteInteger(Self.FStream,4,Value$6);
   }
   ,SetValueAsString:function(Self, Value$7) {
      TStream.Clear$1(Self.FStream);
      TStream.WriteString(Self.FStream,Value$7);
   }
   ,Destroy:TObject.Destroy
};
function SphericalToCartesian(Position$5) {
   var Result = [0,0,0];
   Result[0] = Position$5[2]*Math.cos(DegToRad(Position$5[1]))*Math.cos(DegToRad(Position$5[0]));
   Result[1] = Position$5[2]*Math.cos(DegToRad(Position$5[1]))*Math.sin(DegToRad(Position$5[0]));
   Result[2] = Position$5[2]*Math.sin(DegToRad(Position$5[1]));
   return Result
};
SphericalToCartesian = SphericalToCartesian;
function sofaLoadFile(Buffer$6) {
   var Result = null;
   Result = TObject.Create($New(TSofaFile));
   TSofaFile.LoadFromBuffer(Result,Buffer$6);
   return Result
};
sofaLoadFile = sofaLoadFile;
function sofaGetSourcePositionList(SofaFile, Spherical$1) {
   var Result = [];
   var Index$24 = 0;
   var $temp27;
   for(Index$24=0,$temp27=SofaFile.FNumberOfSources;Index$24<$temp27;Index$24++) {
      Result.push(TSofaPositions.GetPosition(SofaFile.FSourcePositions,Index$24,Spherical$1));
   }
   return Result
};
sofaGetSourcePositionList = sofaGetSourcePositionList;
function sofaGetSourcePosition(SofaFile$1, Callback, Spherical$2) {
   var Index$25 = 0;
   var $temp28;
   for(Index$25=0,$temp28=SofaFile$1.FNumberOfSources;Index$25<$temp28;Index$25++) {
      Callback(TSofaPositions.GetPosition(SofaFile$1.FSourcePositions,Index$25,Spherical$2));
   }
};
sofaGetSourcePosition = sofaGetSourcePosition;
function sofaGetSofaDelays(SofaFile$2) {
   var Result = [];
   var Index$26 = 0;
   var $temp29;
   for(Index$26=0,$temp29=TSofaFile.GetDelayCount(SofaFile$2);Index$26<$temp29;Index$26++) {
      Result.push(TSofaFile.GetDelay(SofaFile$2,Index$26));
   }
   return Result
};
sofaGetSofaDelays = sofaGetSofaDelays;
function sofaGetSampleRates(SofaFile$3) {
   var Result = [];
   var Index$27 = 0;
   var $temp30;
   for(Index$27=0,$temp30=TSofaFile.GetSampleRateCount(SofaFile$3);Index$27<$temp30;Index$27++) {
      Result.push(TSofaFile.GetSampleRate(SofaFile$3,Index$27));
   }
   return Result
};
sofaGetSampleRates = sofaGetSampleRates;
function sofaGetReceiverPositionList(SofaFile$4, Spherical$3) {
   var Result = [];
   var Index$28 = 0;
   var $temp31;
   for(Index$28=0,$temp31=SofaFile$4.FNumberOfReceivers;Index$28<$temp31;Index$28++) {
      Result.push(TSofaPositions.GetPosition(SofaFile$4.FReceiverPositions,Index$28,Spherical$3));
   }
   return Result
};
sofaGetReceiverPositionList = sofaGetReceiverPositionList;
function sofaGetReceiverPosition(SofaFile$5, Callback$1, Spherical$4) {
   var Index$29 = 0;
   var $temp32;
   for(Index$29=0,$temp32=SofaFile$5.FNumberOfReceivers;Index$29<$temp32;Index$29++) {
      Callback$1(TSofaPositions.GetPosition(SofaFile$5.FReceiverPositions,Index$29,Spherical$4));
   }
};
sofaGetReceiverPosition = sofaGetReceiverPosition;
function sofaGetListenerPositionList(SofaFile$6, Spherical$5) {
   var Result = [];
   var Index$30 = 0;
   var $temp33;
   for(Index$30=0,$temp33=SofaFile$6.FNumberOfListeners;Index$30<$temp33;Index$30++) {
      Result.push(TSofaPositions.GetPosition(SofaFile$6.FListenerPositions,Index$30,Spherical$5));
   }
   return Result
};
sofaGetListenerPositionList = sofaGetListenerPositionList;
function sofaGetListenerPosition(SofaFile$7, Callback$2, Spherical$6) {
   var Index$31 = 0;
   var $temp34;
   for(Index$31=0,$temp34=SofaFile$7.FNumberOfListeners;Index$31<$temp34;Index$31++) {
      Callback$2(TSofaPositions.GetPosition(SofaFile$7.FListenerPositions,Index$31,Spherical$6));
   }
};
sofaGetListenerPosition = sofaGetListenerPosition;
function sofaGetImpulseResponses(SofaFile$8) {
   var Result = [];
   var MeasurementIndex$2 = 0;
   var ReceiverIndex$2 = 0;
   $ArraySetLenC(Result,SofaFile$8.FNumberOfMeasurements,function (){return []});
   var $temp35;
   for(MeasurementIndex$2=0,$temp35=SofaFile$8.FNumberOfMeasurements;MeasurementIndex$2<$temp35;MeasurementIndex$2++) {
      $ArraySetLenC(Result[MeasurementIndex$2],SofaFile$8.FNumberOfReceivers,function (){return null});
      var $temp36;
      for(ReceiverIndex$2=0,$temp36=SofaFile$8.FNumberOfReceivers;ReceiverIndex$2<$temp36;ReceiverIndex$2++) {
         Result[MeasurementIndex$2][ReceiverIndex$2]=TSofaFile.GetImpulseResponse(SofaFile$8,MeasurementIndex$2,ReceiverIndex$2);
      }
   }
   return Result
};
sofaGetImpulseResponses = sofaGetImpulseResponses;
function sofaGetFilterSpherical(SofaFile$9, Phi$1, Theta$1, Radius$1) {
   var Result = null;
   var Index = 0;
   Index = TSofaFile.GetClosestIndexSpherical(SofaFile$9,Phi$1,Theta$1,Radius$1);
   Result = {
      "RightDelay" : TSofaFile.GetDelay(SofaFile$9,1)
      ,"LeftDelay" : TSofaFile.GetDelay(SofaFile$9,0)
      ,"Right" : TSofaFile.GetImpulseResponse(SofaFile$9,Index,1)
      ,"Left" : TSofaFile.GetImpulseResponse(SofaFile$9,Index,0)
      ,"SampleRate" : TSofaFile.GetSampleRate(SofaFile$9,0)
   };
   return Result
};
sofaGetFilterSpherical = sofaGetFilterSpherical;
function sofaGetFilterCartesian(SofaFile$10, X$3, Y$3, Z$1) {
   var Result = null;
   var Index$1 = 0;
   Index$1 = TSofaFile.GetClosestIndexCartesian(SofaFile$10,X$3,Y$3,Z$1);
   Result = {
      "RightDelay" : TSofaFile.GetDelay(SofaFile$10,1)
      ,"LeftDelay" : TSofaFile.GetDelay(SofaFile$10,0)
      ,"Right" : TSofaFile.GetImpulseResponse(SofaFile$10,Index$1,1)
      ,"Left" : TSofaFile.GetImpulseResponse(SofaFile$10,Index$1,0)
      ,"SampleRate" : TSofaFile.GetSampleRate(SofaFile$10,0)
   };
   return Result
};
sofaGetFilterCartesian = sofaGetFilterCartesian;
function sofaGetEmitterPositionList(SofaFile$11, Spherical$7) {
   var Result = [];
   var Index$32 = 0;
   var $temp37;
   for(Index$32=0,$temp37=SofaFile$11.FNumberOfEmitters;Index$32<$temp37;Index$32++) {
      Result.push(TSofaPositions.GetPosition(SofaFile$11.FEmitterPositions,Index$32,Spherical$7));
   }
   return Result
};
sofaGetEmitterPositionList = sofaGetEmitterPositionList;
function sofaGetEmitterPosition(SofaFile$12, Callback$3, Spherical$8) {
   var Index$33 = 0;
   var $temp38;
   for(Index$33=0,$temp38=SofaFile$12.FNumberOfEmitters;Index$33<$temp38;Index$33++) {
      Callback$3(TSofaPositions.GetPosition(SofaFile$12.FEmitterPositions,Index$33,Spherical$8));
   }
};
sofaGetEmitterPosition = sofaGetEmitterPosition;
function sofaGetAttribute(SofaFile$13, AttributeName) {
   var Result = "";
   Result = "";
   if (SofaFile$13.FAttributes.has(AttributeName)) {
      return String(SofaFile$13.FAttributes.get(AttributeName));
   }
   return Result
};
sofaGetAttribute = sofaGetAttribute;
var EHdfInvalidFormat = {
   $ClassName:"EHdfInvalidFormat",$Parent:Exception
   ,$Init:function ($) {
      Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function CartesianToSpherical(Position$6) {
   var Result = [0,0,0];
   Result[2] = Math.sqrt((Math.pow(Position$6[0],2))+(Math.pow(Position$6[1],2))+(Math.pow(Position$6[2],2)));
   Result[1] = Math.asin(Position$6[2]/Result[2]);
   Result[0] = Math.atan2(Position$6[1],Position$6[0]);
   return Result
};
CartesianToSpherical = CartesianToSpherical;
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
   ,a$2:function(Self, Value$8) {
      TTextAreaElement.a$4(Self).value = Value$8;
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
   ,a$27:function(Self, Value$9) {
      Self.FTextNode$4.data = Value$9;
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
   ,Create$291:function(Self, Text$10, OnReady) {
      Self.FText = Text$10;
      Self.FOnReady = OnReady;
      Self.FConvolverNode = AudioContext.createConvolver();
      Self.FConvolverNode.normalize = false;
      Self.FConvolverNode.connect(AudioContext.destination);
      TTrack.RequestAudio(Self);
      return Self
   }
   ,FromHrtf:function(Self, Hrtfs, Index$34) {
      var HrtfBuffer = null,
         OfflineAudioContext = null;
      var Buffer$7 = null,
         BufferSource = null;
      HrtfBuffer = AudioContext.createBuffer(2,Hrtfs.FSampleFrames,AudioContext.sampleRate);
      HrtfBuffer.copyToChannel(THrtfs.GetMeasurement(Hrtfs,Index$34).FLeft,0);
      HrtfBuffer.copyToChannel(THrtfs.GetMeasurement(Hrtfs,Index$34).FRight,1);
      Self.FHrtfIndex = Index$34;
      if (AudioContext.sampleRate!=Hrtfs.FSampleRate$1) {
         var OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
      OfflineAudioContext = new OfflineAudioContext(2, Hrtfs.FSampleFrames, AudioContext.sampleRate);
         Buffer$7 = AudioContext.createBuffer(2,Hrtfs.FSampleFrames,AudioContext.sampleRate);
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
   ,a$40:function(Self) {
      return Self.FMeasurements.length;
   }
   ,Create$289:function(Self, SofaFile$14) {
      var MinZ = 0,
         MeasurementIndex$3 = 0;
      var Position$7 = [0,0,0],
         MeasurementIndex$4 = 0;
      var Position$8 = [0,0,0],
         GlobalMaxLevel = 0,
         a$46 = 0;
      var Measurement$1 = null,
         MaxLevel = 0;
      var a$47 = [];
      Self.FSampleFrames = SofaFile$14.FNumberOfDataSamples;
      Self.FSampleRate$1 = TSofaFile.GetSampleRate(SofaFile$14,0);
      $Assert(SofaFile$14.FNumberOfMeasurements==SofaFile$14.FNumberOfSources,"","");
      MinZ = Math.abs(TSofaPositions.GetPosition(SofaFile$14.FSourcePositions,0,false)[2]);
      var $temp39;
      for(MeasurementIndex$3=1,$temp39=SofaFile$14.FNumberOfMeasurements;MeasurementIndex$3<$temp39;MeasurementIndex$3++) {
         Position$7 = TSofaPositions.GetPosition(SofaFile$14.FSourcePositions,MeasurementIndex$3,false);
         if (Math.abs(Position$7[2])<MinZ) {
            MinZ = Math.abs(Position$7[2]);
         }
      }
      var $temp40;
      for(MeasurementIndex$4=0,$temp40=SofaFile$14.FNumberOfMeasurements;MeasurementIndex$4<$temp40;MeasurementIndex$4++) {
         Position$8 = TSofaPositions.GetPosition(SofaFile$14.FSourcePositions,MeasurementIndex$4,false);
         if (Math.abs(Position$8[2])>MinZ) {
            continue;
         }
         $Assert(SofaFile$14.FNumberOfReceivers>=2,"","");
         Self.FMeasurements.push(THrtfMeasurement.Create$290($New(THrtfMeasurement),Position$8.slice(0),new Float32Array(TSofaFile.GetImpulseResponse(SofaFile$14,MeasurementIndex$4,0)),new Float32Array(TSofaFile.GetImpulseResponse(SofaFile$14,MeasurementIndex$4,1))));
      }
      GlobalMaxLevel = 0;
      a$47 = Self.FMeasurements;
      var $temp41;
      for(a$46=0,$temp41=a$47.length;a$46<$temp41;a$46++) {
         Measurement$1 = a$47[a$46];
         MaxLevel = THrtfMeasurement.GetMaxLevel(Measurement$1);
         if (MaxLevel>GlobalMaxLevel) {
            GlobalMaxLevel = MaxLevel;
         }
      }
      Self.FScaleFactor = (GlobalMaxLevel!=0)?1/GlobalMaxLevel:1;
      return Self
   }
   ,GetMeasurement:function(Self, Index$35) {
      var Result = null;
      if (Index$35<0&&Index$35>=Self.FMeasurements.length) {
         throw Exception.Create($New(Exception),"Index out of bounds");
      }
      Result = Self.FMeasurements[Index$35];
      return Result
   }
   ,Destroy:TObject.Destroy
};
var THrtfMeasurement = {
   $ClassName:"THrtfMeasurement",$Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FLeft = $.FRight = null;
      $.FPosition$1 = [0,0,0];
   }
   ,Create$290:function(Self, Position$9, Left$4, Right$4) {
      Self.FPosition$1 = Position$9.slice(0);
      Self.FLeft = Left$4;
      Self.FRight = Right$4;
      return Self
   }
   ,GetMaxLevel:function(Self) {
      var Result = 0;
      var Index$36 = 0;
      var Index$37 = 0;
      Result = 0;
      var $temp42;
      for(Index$36=0,$temp42=Self.FLeft.length;Index$36<$temp42;Index$36++) {
         if (Math.abs(Self.FLeft[Index$36])>Result) {
            Result = Math.abs(Self.FLeft[Index$36]);
         }
      }
      var $temp43;
      for(Index$37=0,$temp43=Self.FRight.length;Index$37<$temp43;Index$37++) {
         if (Math.abs(Self.FRight[Index$37])>Result) {
            Result = Math.abs(Self.FRight[Index$37]);
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

