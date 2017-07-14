unit SimpleSofaFile;

interface

uses
  ECMA.TypedArray, WHATWG.Encoding;

type
  EHdfInvalidFormat = class(Exception);

  TVector3 = record
    X, Y, Z: Float;
  end;

  THdfSignature = String;

  JZlibInflate = class external 'Zlib.Inflate'
    constructor Create(compressed: JUint8Array);
    function decompress: Variant;
  end;

  TStream = class
  private
    FPosition: Integer;
    FDataView: JDataView;
  public
    constructor Create(Buffer: JArrayBuffer);

    function ReadInteger(const Count: Integer): Integer; overload;
    function ReadFloat(const Count: Integer): Float; overload;
    function ReadString(const Count: Integer): String; overload;
    function ReadBuffer(const Count: Integer): JUint8Array; overload;

    procedure WriteInteger(const Count: Integer; const Value: Integer);
    procedure WriteString(const Value: String);
    procedure WriteBuffer(Buffer: JUInt8Array);
    procedure Clear;

    function Seek(Position: Integer; IsRelative: Boolean = False): Integer;

    property DataView: JDataView read FDataView;
    property Size: Integer read (FDataView.buffer.byteLength);
    property Position: Integer read FPosition write FPosition;
  end;

  THdfSuperBlock = class
  private
    FOffsetSize: Integer;
    FLengthsSize: Integer;
    FEndOfFileAddress: Integer;
  public
    procedure LoadFromStream(Stream: TStream);

    property OffsetSize: Integer read FOffsetSize;
    property LengthsSize: Integer read FLengthsSize;
    property EndOfFileAddress: Integer read FEndOfFileAddress;
  end;

  THdfDataObject = class;

  THdfDataObjectMessage = class
  private
    FSuperBlock: THdfSuperBlock;
  protected
    FVersion: Integer;
    FDataObject: THdfDataObject;
    property Superblock: THdfSuperBlock read FSuperBlock;
    property DataObject: THdfDataObject read FDataObject;
  public
    constructor Create(SuperBlock: THdfSuperBlock; DataObject: THdfDataObject);

    procedure LoadFromStream(Stream: TStream); virtual;

    property Version: Integer read FVersion;
  end;

  THdfMessageDataSpace = class(THdfDataObjectMessage)
  private
    FDimensionality: Integer;
    FFlags: Integer;
    FType: Integer;
    FDimensionSize: array of Integer;
    FDimensionMaxSize: array of Integer;
    function GetDimension(Index: Integer): Integer;
  public
    procedure LoadFromStream(Stream: TStream); override;

    property Dimensionality: Integer read FDimensionality;
    property Dimension[Index: Integer]: Integer read GetDimension;
  end;

  THdfMessageLinkInfo = class(THdfDataObjectMessage)
  private
    FFractalHeapAddress: Integer;
  public
    procedure LoadFromStream(Stream: TStream); override;

    property FractalHeapAddress: Integer read FFractalHeapAddress;
  end;

  THdfMessageDataType = class;

  THdfBaseDataType = class
  protected
    FDataTypeMessage: THdfMessageDataType;
  public
    constructor Create(DatatypeMessage: THdfMessageDataType); virtual;

    procedure LoadFromStream(Stream: TStream); virtual;
  end;

  THdfDataTypeFixedPoint = class(THdfBaseDataType)
  public
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfDataTypeFloatingPoint = class(THdfBaseDataType)
  public
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfDataTypeTime = class(THdfBaseDataType)
  public
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfDataTypeString = class(THdfBaseDataType);

  THdfDataTypeBitfield = class(THdfBaseDataType)
  public
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfDataTypeOpaque = class(THdfBaseDataType);

  THdfDataTypeCompoundPart = class
  private
    FName: String;
    FByteOffset: Integer;
    FSize: Integer;
    FDataType: THdfMessageDataType;
  public
    constructor Create(DatatypeMessage: THdfMessageDataType); virtual;

    procedure ReadFromStream(Stream: TStream);
  end;

  THdfDataTypeCompound = class(THdfBaseDataType)
  private
    FDataTypes: array of THdfDataTypeCompoundPart;
  public
    constructor Create(DatatypeMessage: THdfMessageDataType); override;
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfDataTypeReference = class(THdfBaseDataType);
  THdfDataTypeEnumerated = class(THdfBaseDataType);
  THdfDataTypeVariableLength = class(THdfBaseDataType)
  private
    FDataType: THdfMessageDataType;
  public
    constructor Create(DatatypeMessage: THdfMessageDataType); override;
    procedure LoadFromStream(Stream: TStream); override;
  end;
  THdfDataTypeArray = class(THdfBaseDataType);

  THdfMessageDataType = class(THdfDataObjectMessage)
  private
    FDataClass: Integer;
    FClassBitField: array [0..2] of Integer;
    FSize: Integer;
    FDataType: THdfBaseDataType;
  public
    procedure LoadFromStream(Stream: TStream); override;

    property Size: Integer read FSize;
    property DataClass: Integer read FDataClass;
  end;

  THdfMessageDataFill = class(THdfDataObjectMessage)
  public
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfMessageDataLayout = class(THdfDataObjectMessage)
  private
    FLayoutClass: Integer;
    FDataAddress: Integer;
    FDataSize: Integer;
    FDimensionality: Integer;
    procedure ReadTree(Stream: TStream; Size: Integer);
  public
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfMessageGroupInfo = class(THdfDataObjectMessage)
  public
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfMessageFilterPipeline = class(THdfDataObjectMessage)
  public
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfAttribute = class
  private
    FName: String;
    FStream: TStream;
    function GetValueAsString: String;
    procedure SetValueAsString(const Value: String);
    function GetValueAsInteger: Integer;
    procedure SetValueAsInteger(const Value: Integer);
  public
    constructor Create(Name: String);

    property Name: String read FName;
    property ValueAsString: String read GetValueAsString write SetValueAsString;
    property ValueAsInteger: Integer read GetValueAsInteger write SetValueAsInteger;
  end;

  THdfMessageAttribute = class(THdfDataObjectMessage)
  private
    FName: String;
    FDatatypeMessage: THdfMessageDataType;
    FDataspaceMessage: THdfMessageDataSpace;

    procedure ReadData(Stream: TStream; Attribute: THdfAttribute);
    procedure ReadDataDimension(Stream: TStream; Attribute: THdfAttribute;
      Dimension: Integer);
  public
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfMessageHeaderContinuation = class(THdfDataObjectMessage)
  public
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfMessageAttributeInfo = class(THdfDataObjectMessage)
  private
    FFractalHeapAddress: Integer;
  public
    procedure LoadFromStream(Stream: TStream); override;

    property FractalHeapAddress: Integer read FFractalHeapAddress;
  end;

  THdfFractalHeap = class
  private
    FSuperBlock: THdfSuperBlock;
    FDataObject: THdfDataObject;
    FSignature: String;
    FVersion: Integer;
    FHeapIdLength: Integer;
    FEncodedLength: Integer;
    FFlags: Integer;
    FMaximumSize: Integer;
    FNextHugeID: Integer;
    FBtreeAddresses: Integer;
    FAmountFreeSpace: Integer;
    FAddressManagedBlock: Integer;
    FAmountManagedSpace: Integer;
    FAmountAllocatedManagedSpace: Integer;
    FOffsetDirectBlockAllocation: Integer;
    FNumberOfManagedObjects: Integer;
    FSizeOfHugeObjects: Integer;
    FNumberOfHugeObjects: Integer;
    FSizeOfTinyObjects: Integer;
    FNumberOfTinyObjects: Integer;
    FTableWidth: Integer;
    FStartingBlockSize: Integer;
    FMaximumDirectBlockSize: Integer;
    FMaximumHeapSize: Integer;
    FStartingNumber: Integer;
    FAddressOfRootBlock: Integer;
    FCurrentNumberOfRows: Integer;
    FSizeOfFilteredRootDirectBlock: Integer;
    FIOFilterMask: Integer;
  protected
    property SuperBlock: THdfSuperBlock read FSuperBlock;
  public
    constructor Create(SuperBlock: THdfSuperBlock; DataObject: THdfDataObject);
    procedure LoadFromStream(Stream: TStream);

    property MaximumSize: Integer read FMaximumSize;
    property MaximumDirectBlockSize: Integer read FMaximumDirectBlockSize;
    property MaximumHeapSize: Integer read FMaximumHeapSize;
    property StartingBlockSize: Integer read FStartingBlockSize;
    property Flags: Integer read FFlags;
    property TableWidth: Integer read FTableWidth;
    property EncodedLength: Integer read FEncodedLength;
  end;

  THdfCustomBlock = class
  private
    FSuperBlock: THdfSuperBlock;
  protected
    FFractalHeap: THdfFractalHeap;
    FChecksum: Integer;
    FBlockOffset: Integer;
    FDataObject: THdfDataObject;
    class function GetSignature: THdfSignature; virtual; abstract;

    property SuperBlock: THdfSuperBlock read FSuperBlock;
  public
    constructor Create(SuperBlock: THdfSuperBlock;
      FractalHeap: THdfFractalHeap; DataObject: THdfDataObject); virtual;

    procedure LoadFromStream(Stream: TStream); virtual;
  end;

  THdfDirectBlock = class(THdfCustomBlock)
  protected
    class function GetSignature: THdfSignature; override;
  public
    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfIndirectBlock = class(THdfCustomBlock)
  private
    FInitialBlockSize: Integer;
    FMaximumNumberOfDirectBlockRows: Integer;
  protected
    class function GetSignature: THdfSignature; override;
  public
    constructor Create(SuperBlock: THdfSuperBlock; FractalHeap: THdfFractalHeap;
      DataObject: THdfDataObject); override;

    procedure LoadFromStream(Stream: TStream); override;
  end;

  THdfDataObject = class
  private
    FName: String;
    FSuperBlock: THdfSuperBlock;
    FSignature: THdfSignature;
    FVersion: Integer;
    FFlags: Integer;
    FAccessTime: Integer;
    FModificationTime: Integer;
    FChangeTime: Integer;
    FBirthTime: Integer;
    FChunkSize: Integer;
    FMaximumCompact: Integer;
    FMinimumDense: Integer;

    FDataLayoutChunk: array of Integer;

    FData: TStream;
    FAttributeList: array of THdfAttribute;

    FDataType: THdfMessageDataType;
    FDataSpace: THdfMessageDataSpace;
    FLinkInfo: THdfMessageLinkInfo;
    FGroupInfo: THdfMessageGroupInfo;
    FAttributeInfo: THdfMessageAttributeInfo;

    FDataObjects: array of THdfDataObject;

    FAttributesHeap: THdfFractalHeap;
    FObjectsHeap: THdfFractalHeap;
    function GetDataObjectCount: Integer;
    function GetDataObject(Index: Integer): THdfDataObject;
    function GetDataLayoutChunk(Index: Integer): Integer;
    function GetDataLayoutChunkCount: Integer;
    function GetAttributeListCount: Integer;
    function GetAttributeListItem(Index: Integer): THdfAttribute;
  protected
    procedure ReadObjectHeaderMessages(Stream: TStream; EndOfStream: Integer);

    property Superblock: THdfSuperBlock read FSuperBlock;
    property AttributesHeap: THdfFractalHeap read FAttributesHeap;
    property ObjectsHeap: THdfFractalHeap read FObjectsHeap;
  public
    constructor Create(SuperBlock: THdfSuperBlock); overload;
    constructor Create(SuperBlock: THdfSuperBlock; Name: String); overload;

    procedure AddDataObject(DataObject: THdfDataObject);
    procedure AddAttribute(Attribute: THdfAttribute);

    procedure LoadFromStream(Stream: TStream);

    function HasAttribute(Name: string): Boolean;
    function GetAttribute(Name: string): String;

    property Name: String read FName;
    property Data: TStream read FData write FData;
    property DataType: THdfMessageDataType read FDataType;
    property DataSpace: THdfMessageDataSpace read FDataSpace;
    property LinkInfo: THdfMessageLinkInfo read FLinkInfo;
    property GroupInfo: THdfMessageGroupInfo read FGroupInfo;
    property AttributeInfo: THdfMessageAttributeInfo read FAttributeInfo;

    property AttributeListCount: Integer read GetAttributeListCount;
    property AttributeListItem[Index: Integer]: THdfAttribute read GetAttributeListItem;
    property DataObjectCount: Integer read GetDataObjectCount;
    property DataObject[Index: Integer]: THdfDataObject read GetDataObject;
    property DataLayoutChunkCount: Integer read GetDataLayoutChunkCount;
    property DataLayoutChunk[Index: Integer]: Integer read GetDataLayoutChunk;
  end;

  THdfFile = class
  private
    FSuperBlock: THdfSuperBlock;
    FDataObject: THdfDataObject;
  public
    constructor Create;

    procedure LoadFromStream(Stream: TStream);

    procedure LoadFromBuffer(Buffer: JArrayBuffer);

    function HasAttribute(Name: string): Boolean;
    function GetAttribute(Name: string): string;

    property SuperBlock: THdfSuperBlock read FSuperBlock;
    property DataObject: THdfDataObject read FDataObject;
  end;

  TSofaAttribute = record
    Name: String;
    Value: String;
  end;

  TSofaFile = class
  private
    FNumberOfMeasurements: Integer;
    FNumberOfDataSamples: Integer;
    FNumberOfEmitters: Integer;
    FNumberOfReceivers: Integer;
    FListenerPositions: array of TVector3;
    FReceiverPositions: array of TVector3;
    FSourcePositions: array of TVector3;
    FEmitterPositions: array of TVector3;
    FListenerUp: TVector3;
    FListenerView: TVector3;
    FSampleRate: array of Float;
    FImpulseResponses: array of array of JFloat64Array;
    FDelay: array of Float;
    FNumberOfSources: Integer;
    FAttributes: array of TSofaAttribute;
    procedure ReadDataObject(DataObject: THdfDataObject);
    function GetEmitterPositions(Index: Integer): TVector3;
    function GetListenerPositions(Index: Integer): TVector3;
    function GetReceiverPositions(Index: Integer): TVector3;
    function GetSourcePositions(Index: Integer): TVector3;
    function GetSampleRate(Index: Integer): Float;
    function GetDelay(Index: Integer): Float;
    function GetDelayCount: Integer;
    function GetSampleRateCount: Integer;
    function GetImpulseResponse(MeasurementIndex, ReceiverIndex: Integer): JFloat64Array;
  public
    procedure LoadFromBuffer(Buffer: JArrayBuffer);

    property Attributes: array of TSofaAttribute read FAttributes;
    property NumberOfMeasurements: Integer read FNumberOfMeasurements;
    property NumberOfReceivers: Integer read FNumberOfReceivers;
    property NumberOfEmitters: Integer read FNumberOfEmitters;
    property NumberOfDataSamples: Integer read FNumberOfDataSamples;
    property NumberOfSources: Integer read FNumberOfSources;

    property ListenerPositions[Index: Integer]: TVector3 read GetListenerPositions;
    property ReceiverPositions[Index: Integer]: TVector3 read GetReceiverPositions;
    property SourcePositions[Index: Integer]: TVector3 read GetSourcePositions;
    property EmitterPositions[Index: Integer]: TVector3 read GetEmitterPositions;
    property ListenerUp: TVector3 read FListenerUp;
    property ListenerView: TVector3 read FListenerView;
    property ImpulseResponse[MeasurementIndex, ReceiverIndex: Integer]: JFloat64Array read GetImpulseResponse;
    property SampleRate[Index: Integer]: Float read GetSampleRate;
    property SampleRateCount: Integer read GetSampleRateCount;
    property Delay[Index: Integer]: Float read GetDelay;
    property DelayCount: Integer read GetDelayCount;
  end;

function LoadSofaFile(Buffer: JArrayBuffer): TSofaFile; export;
function GetSofaAttribute(SofaFile: TSofaFile; const AttributeName: String): String; export;

implementation

uses
  WHATWG.Console;

resourcestring
  RStrIndexOutOfBounds = 'Index out of bounds (%d)';
  RStrSofaConventionMissing = 'File does not contain the SOFA convention';
  RStrAllFiltersMustBeEnabled = 'All filters must be enabled';
  RStrErrorReadingDimensions = 'Error reading dimensions';
  RStrErrorSeekingFirstObject = 'Error seeking first object';
  RStrErrorUnknownDataClass = 'Error: unknown data class';
  RStrErrorUnsupportedCompoundVersion = 'Error unsupported compound version (%d)';
  RStrFHDBType1UnsupportedValues = 'FHDB type 1 unsupported values';
  RStrInvalidBaseAddress = 'The base address should be zero';
  RStrInvalidCount = 'Invalid count';
  RStrInvalidHDF = 'The file is not a valid HDF';
  RStrInvalidPosition = 'Invalid Position';
  RStrInvalidVersion = 'Invalid version';
  RStrNoHugeObjects = 'Cannot handle huge objects';
  RStrNoTinyObjects = 'Cannot handle tiny objects';
  RStrPositionExceedsByteLength = 'Position exceeds byte length';
  RStrSizeMismatch = 'Size mismatch';
  RStrTooManyFilters = 'The filter pipeline message has too many filters';
  RStrUnknownBitWidth = 'Unknown bit width';
  RStrUnknownDatatype = 'Unknown datatype (%d)';
  RStrUnsupportedBitPrecision = 'Unsupported bit precision';
  RStrUnsupportedFilter = 'Unsupported filter';
  RStrUnsupportedOHDRMessageFlag = 'Unsupported OHDR message flag';
  RStrUnsupportedValues = 'Unsupported values';
  RStrUnsupportedVersion = 'Unsupported version';
  RStrUnsupportedVersionOfAttributeInfoMessage = 'Unsupported version of attribute info message';
  RStrUnsupportedVersionOfDataFillMessage = 'Unsupported version of data fill message';
  RStrUnsupportedVersionOfDataLayoutMessage = 'Unsupported version of data layout message';
  RStrUnsupportedVersionOfDataspaceMessage = 'Unsupported version of dataspace message';
  RStrUnsupportedVersionOfDataTypeMessage = 'Unsupported version of data type message';
  RStrUnsupportedVersionOfFractalHeap = 'Unsupported version of fractal heap';
  RStrUnsupportedVersionOfGroupInfoMessage = 'Unsupported version of group info message';
  RStrUnsupportedVersionOfLinkInfoMessage = 'Unsupported version of link info message';
  RStrUnsupportedVersionOfCustomBlock = 'Unsupported version of custom block';
  RStrUnsupportedVersionOfMessageAttribute = 'Unsupported version of message attribute';
  RStrUnsupportedVersionOfTheFilterPipelineMessage = 'Unsupported version of the filter pipeline message';
  RStrWrongSignature = 'Wrong signature (%s)';
  RStrZeroBlockOffset = 'Only a block offset of 0 is supported so far';

uses
  WHATWG.Console;

{ TStream }

constructor TStream.Create(Buffer: JArrayBuffer);
begin
  FPosition := 0;
  FDataView := JDataView.Create(Buffer);
end;

function TStream.ReadInteger(const Count: Integer): Integer;
begin
  if FPosition + Count > FDataView.byteLength then
    raise Exception.Create(RStrPositionExceedsByteLength);

  case Count of
    1:
      Result := FDataView.getUint8(FPosition);
    2:
      Result := FDataView.getUint16(FPosition, True);
    3:
      Result := FDataView.getUint16(FPosition, True) + FDataView.getUint8(FPosition + 2) shl 16;
    4:
      Result := FDataView.getUint32(FPosition, True);
    5:
      Result := FDataView.getUint32(FPosition, True) or (FDataView.getUint8(FPosition + 4) shl 32);
    6:
      Result := FDataView.getUint32(FPosition, True) or (FDataView.getUint16(FPosition + 4, True) shl 32);
    8:
      Result := FDataView.getUint32(FPosition, True) or (FDataView.getUint32(FPosition + 4, True) shl 32);
    else
      raise Exception.Create(RStrUnknownBitWidth);
  end;

  Inc(FPosition, Count);
end;

function TStream.ReadFloat(const Count: Integer): Float;
begin
  if FPosition + Count > FDataView.byteLength then
    raise Exception.Create(RStrPositionExceedsByteLength);

  case Count of
    4:
      Result := FDataView.getFloat32(FPosition, True);
    8:
      Result := FDataView.getFloat64(FPosition, True);
    else
      raise Exception.Create(RStrUnknownBitWidth);
  end;

  Inc(FPosition, Count);
end;

function TStream.ReadString(const Count: Integer): String;
begin
  if FPosition + Count > FDataView.byteLength then
    raise Exception.Create(RStrPositionExceedsByteLength);

  var Decoder := JTextDecoder.Create;
  Result := Decoder.decode(FDataView.buffer.slice(FPosition, FPosition + Count));

  // eventually strip #0 character at the end
  if Ord(Result[High(Result)]) = 0 then
    Result := Result.DeleteRight(1);

  Inc(FPosition, Count);
end;

function TStream.ReadBuffer(const Count: Integer): JUint8Array;
begin
  if FPosition + Count > FDataView.byteLength then
    raise Exception.Create(RStrPositionExceedsByteLength);

  Result := JUint8Array.Create(FDataView.buffer.slice(FPosition, FPosition + Count));
  Inc(FPosition, Count);
end;

function TStream.Seek(Position: Integer; IsRelative: Boolean = False): Integer;
begin
  FPosition := Position + if IsRelative then FPosition;
  if FPosition > FDataView.byteLength then
    FPosition := FDataView.byteLength;

  if FPosition > FDataView.byteLength then
    raise Exception.Create(RStrInvalidPosition);

  Result := FPosition;
end;

procedure TStream.WriteInteger(const Count: Integer; const Value: Integer);
begin
  case Count of
    1:
      FDataView.setUint8(FPosition, Value);
    2:
      FDataView.setUint16(FPosition, Value);
    4:
      FDataView.setUint32(FPosition, Value);
    else
      raise Exception.Create(RStrInvalidCount);
  end;

  Inc(FPosition, Count);
end;

procedure TStream.WriteString(const Value: String);
begin
  var Encoder := JTextEncoder.Create;
  WriteBuffer(Encoder.Encode(Value));
end;

procedure TStream.Clear;
begin
  FPosition := 0;
end;

procedure TStream.WriteBuffer(Buffer: JUint8Array);
begin
  var OldBuffer := JUint8Array(FDataView.buffer);
  var NewBuffer := JUint8Array.Create(OldBuffer.byteLength + Buffer.byteLength);
  NewBuffer.set(OldBuffer, 0);
  NewBuffer.set(Buffer, OldBuffer.byteLength);
  FDataView := JDataView.Create(NewBuffer.buffer);
  FPosition := NewBuffer.byteLength;
end;


{ THdfSuperBlock }

procedure THdfSuperBlock.LoadFromStream(Stream: TStream);
begin
  var Identifier := Stream.ReadInteger(1);
  if Identifier <> 137 then
    raise Exception.Create(RStrInvalidHDF);

  var FormatSignature := Stream.ReadString(3);
  if FormatSignature <> 'HDF' then
    raise Exception.Create(RStrInvalidHDF);

  var FormatSignatureVersion := Stream.ReadInteger(4);
  if FormatSignatureVersion <> 169478669 then
    raise Exception.Create(RStrInvalidHDF);

  // read version
  var Version := Stream.ReadInteger(1);
  if not (Version in [2, 3]) then
    raise Exception.Create(RStrUnsupportedVersion);

  // read offset & length size
  FOffsetSize := Stream.ReadInteger(1);
  FLengthsSize := Stream.ReadInteger(1);

  // read consistency flag
  var ConsistencyFlag := Stream.ReadInteger(1);

  // read base address
  var BaseAddress := Stream.ReadInteger(FOffsetSize);
  if BaseAddress <> 0 then
    raise Exception.Create(RStrInvalidBaseAddress);

  // read superblock extension address
  var SuperBlockExtensionAddress := Stream.ReadInteger(FOffsetSize);

  // read end of file address
  FEndOfFileAddress := Stream.ReadInteger(FOffsetSize);

  // read group object header address
  var RootGroupObjectHeaderAddress := Stream.ReadInteger(FOffsetSize);

  if FEndOfFileAddress <> Stream.Size then
    raise Exception.Create(RStrSizeMismatch);

  // read checksum
  var Checksum := Stream.ReadInteger(4);

  // read checksum
  if Stream.Seek(RootGroupObjectHeaderAddress) <> RootGroupObjectHeaderAddress then
    raise Exception.Create(RStrErrorSeekingFirstObject);
end;


{ THdfDataObjectMessage }

constructor THdfDataObjectMessage.Create(SuperBlock: THdfSuperBlock; DataObject: THdfDataObject);
begin
  FSuperBlock := SuperBlock;
  FDataObject := DataObject;
end;

procedure THdfDataObjectMessage.LoadFromStream(Stream: TStream);
begin
  // read version
  FVersion := Stream.ReadInteger(1);
end;


{ THdfMessageDataSpace }

procedure THdfMessageDataSpace.LoadFromStream(Stream: TStream);
var
  Index: Integer;
begin
  inherited LoadFromStream(Stream);

  if not (FVersion in [1, 2]) then
    raise Exception.Create(RStrUnsupportedVersionOfDataspaceMessage);

  // read dimensionality
  FDimensionality := Stream.ReadInteger(1);

  // read flags
  FFlags := Stream.ReadInteger(1);

  // eventually skip reserved
  if FVersion = 1 then
  begin
    Stream.Seek(5, True);

    raise Exception.Create(RStrUnsupportedVersionOfDataspaceMessage);
  end;

  // read type
  FType := Stream.ReadInteger(1);

  // read dimension size
  //SetLength(FDimensionSize, FDimensionality);
  for Index := 0 to FDimensionality - 1 do
  begin
    var Size := Stream.ReadInteger(Superblock.LengthsSize);
    FDimensionSize.Add(Size);
  end;

  // eventually read dimension max size
  if (FFlags and 1) <> 0 then
  begin
    for Index := 0 to FDimensionality - 1 do
    begin
      var MaxSize := Stream.ReadInteger(Superblock.LengthsSize);
      FDimensionMaxSize.Add(MaxSize);
    end
  end;
end;

function THdfMessageDataSpace.GetDimension(Index: Integer): Integer;
begin
  if (Index < 0) or (Index >= Length(FDimensionSize)) then
    raise Exception.Create(Format(RStrIndexOutOfBounds, [Index]));

  Result := FDimensionSize[Index];
end;


{ THdfBaseDataType }

constructor THdfBaseDataType.Create(DatatypeMessage: THdfMessageDataType);
begin
  FDataTypeMessage := DataTypeMessage;
end;

procedure THdfBaseDataType.LoadFromStream(Stream: TStream);
begin
  // do nothing by default
end;


{ THdfDataTypeFixedPoint }

procedure THdfDataTypeFixedPoint.LoadFromStream(Stream: TStream);
begin
  inherited LoadFromStream(Stream);

  var BitOffset := Stream.ReadInteger(2);
  var BitPrecision := Stream.ReadInteger(2);
end;


{ THdfDataTypeFloatingPoint }

procedure THdfDataTypeFloatingPoint.LoadFromStream(Stream: TStream);
begin
  var BitOffset := Stream.ReadInteger(2);
  var BitPrecision := Stream.ReadInteger(2);

  var ExponentLocation := Stream.ReadInteger(1);
  var ExponentSize := Stream.ReadInteger(1);
  var MantissaLocation := Stream.ReadInteger(1);
  var MantissaSize := Stream.ReadInteger(1);
  var ExponentBias := Stream.ReadInteger(4);

  Assert(BitOffset = 0);
  Assert(MantissaLocation = 0);
  if (BitPrecision = 32) then
  begin
    Assert(ExponentLocation = 23);
    Assert(ExponentSize = 8);
    Assert(MantissaSize = 23);
    Assert(ExponentBias = 127);
  end else
  if (BitPrecision = 64) then
  begin
    Assert(ExponentLocation = 52);
    Assert(ExponentSize = 11);
    Assert(MantissaSize = 52);
    Assert(ExponentBias = 1023);
  end
  else
    raise Exception.Create(RStrUnsupportedBitPrecision);
end;


{ THdfDataTypeTime }

procedure THdfDataTypeTime.LoadFromStream(Stream: TStream);
begin
  var BitPrecision := Stream.ReadInteger(2);
end;


{ THdfDataTypeBitfield }

procedure THdfDataTypeBitfield.LoadFromStream(Stream: TStream);
begin
  var BitOffset := Stream.ReadInteger(2);
  var BitPrecision := Stream.ReadInteger(2);
end;


{ THdfDataTypeCompoundPart }

constructor THdfDataTypeCompoundPart.Create(DatatypeMessage: THdfMessageDataType);
begin
  var DataType := THdfMessageDataType.Create(DatatypeMessage.Superblock, DatatypeMessage.DataObject);
  var Size := DatatypeMessage.Size;
end;

procedure THdfDataTypeCompoundPart.ReadFromStream(Stream: TStream);
var
  ByteIndex: Integer;
  ByteValue: Integer;
  Temp: Integer;
begin
  FName := '';
  repeat
    ByteValue := Stream.ReadInteger(1);
    FName := FName + Chr(ByteValue);
  until ByteValue = 0;

  ByteIndex := 0;
  repeat
    Temp := Stream.ReadInteger(1);
    FByteOffset := FByteOffset + Temp shl (8 * ByteIndex);
    Inc(ByteIndex);
  until 1 shl (8 * ByteIndex) > FSize;

  FDataType.LoadFromStream(Stream);
end;

{ THdfDataTypeCompound }

constructor THdfDataTypeCompound.Create(DatatypeMessage: THdfMessageDataType);
begin
  inherited Create(DatatypeMessage);
end;

procedure THdfDataTypeCompound.LoadFromStream(Stream: TStream);
var
  Index: Integer;
  Count: Integer;
  Part: THdfDataTypeCompoundPart;
begin
  if (FDataTypeMessage.Version <> 3) then
    raise Exception.Create(Format(RStrErrorUnsupportedCompoundVersion, [FDataTypeMessage.Version]));

  Count := FDataTypeMessage.FClassBitField[1] shl 8 + FDataTypeMessage.FClassBitField[0];
  for Index := 0 to Count - 1 do
  begin
    Part := THdfDataTypeCompoundPart.Create(FDataTypeMessage);
    Part.ReadFromStream(Stream);
    FDataTypes.Add(Part);
  end;
end;


{ THdfDataTypeVariableLength }

constructor THdfDataTypeVariableLength.Create(
  DatatypeMessage: THdfMessageDataType);
begin
  inherited Create(DatatypeMessage);

  FDataType := THdfMessageDataType.Create(FDataTypeMessage.Superblock, FDataTypeMessage.DataObject);
end;

procedure THdfDataTypeVariableLength.LoadFromStream(Stream: TStream);
begin
  FDataType.LoadFromStream(Stream);
end;


{ THdfMessageDataType }

procedure THdfMessageDataType.LoadFromStream(Stream: TStream);
begin
  inherited LoadFromStream(Stream);

  // expand class and version
  FDataClass := FVersion and $F;
  FVersion := FVersion shr 4;

  // check version
  if not (FVersion in [1, 3]) then
    raise Exception.Create(RStrUnsupportedVersionOfDataTypeMessage);

  FClassBitField[0] := Stream.ReadInteger(1);
  FClassBitField[1] := Stream.ReadInteger(1);
  FClassBitField[2] := Stream.ReadInteger(1);

  FSize := Stream.ReadInteger(4);

  case FDataClass of
    0:
      FDataType := THdfDataTypeFixedPoint.Create(Self);
    1:
      FDataType := THdfDataTypeFloatingPoint.Create(Self);
    2:
      FDataType := THdfDataTypeTime.Create(Self);
    3:
      FDataType := THdfDataTypeString.Create(Self);
    4:
      FDataType := THdfDataTypeBitfield.Create(Self);
    5:
      FDataType := THdfDataTypeOpaque.Create(Self);
    6:
      FDataType := THdfDataTypeCompound.Create(Self);
    7:
      FDataType := THdfDataTypeReference.Create(Self);
    8:
      FDataType := THdfDataTypeEnumerated.Create(Self);
    9:
      FDataType := THdfDataTypeVariableLength.Create(Self);
    10:
      FDataType := THdfDataTypeArray.Create(Self);
    else
      raise Exception.Create(Format(RStrUnknownDatatype, [FDataClass]));
  end;

  if Assigned(FDataType) then
    FDataType.LoadFromStream(Stream);
end;


{ THdfMessageDataFill }

procedure THdfMessageDataFill.LoadFromStream(Stream: TStream);
begin
  inherited LoadFromStream(Stream);

  // check version
  if FVersion <> 3 then
    raise Exception.Create(RStrUnsupportedVersionOfDataFillMessage);

  // read flags
  var Flags := Stream.ReadInteger(1);

  if (Flags and (1 shl 5)) <> 0 then
  begin
    var Size := Stream.ReadInteger(4);
    Stream.Seek(Size, True);
  end;
end;


{ THdfMessageDataLayout }

procedure THdfMessageDataLayout.LoadFromStream(Stream: TStream);
var
  Index: Integer;
  StreamPos: Integer;
  Size: Integer;
begin
  inherited LoadFromStream(Stream);

  // check version
  if FVersion <> 3 then
    raise Exception.Create(RStrUnsupportedVersionOfDataLayoutMessage);

  FLayoutClass := Stream.ReadInteger(1);
  case FLayoutClass of
    0: // compact storage
      begin
        // read data size
        FDataSize := Stream.ReadInteger(2);

        // read raw data
        DataObject.Data.WriteBuffer(Stream.ReadBuffer(FDataSize));
      end;
    1: // continous storage
      begin
        // compact storage
        FDataAddress := Stream.ReadInteger(Superblock.OffsetSize);
        FDataSize := Stream.ReadInteger(Superblock.LengthsSize);

        if FDataAddress > 0 then
        begin
          StreamPos := Stream.Position;
          Stream.Position := FDataAddress;

          DataObject.Data.WriteBuffer(Stream.ReadBuffer(FDataSize));

          Stream.Position := StreamPos;
        end;
      end;
    2:
      begin
        FDimensionality := Stream.ReadInteger(1);
        FDataAddress := Stream.ReadInteger(Superblock.OffsetSize);
        for Index := 0 to FDimensionality - 1 do
        begin
          var DataLayoutChunk := Stream.ReadInteger(4);
          FDataObject.FDataLayoutChunk.Add(DataLayoutChunk);
        end;

        Size := DataObject.FDataLayoutChunk[FDimensionality - 1];
        for Index := 0 to DataObject.DataSpace.Dimensionality - 1 do
          Size := Size * DataObject.DataSpace.FDimensionSize[Index];

        if (FDataAddress > 0) and (FDataAddress < Superblock.EndOfFileAddress) then
        begin
          StreamPos := Stream.Position;
          Stream.Position := FDataAddress;

          ReadTree(Stream, Size);

          Stream.Position := StreamPos;
        end;
      end;
  end;
end;

procedure THdfMessageDataLayout.ReadTree(Stream: TStream; Size: Integer);
var
  Key: Integer;
  Start: array of Integer;
begin
  if DataObject.DataSpace.Dimensionality > 3 then
    raise EHdfInvalidFormat.Create(RStrErrorReadingDimensions);

  // read signature
  var Signature := Stream.ReadString(4);
  if Signature <> 'TREE' then
    raise Exception.Create(Format(RStrWrongSignature, [Signature]));

  var NodeType := Stream.ReadInteger(1);
  var NodeLevel := Stream.ReadInteger(1);

  var EntriesUsed := Stream.ReadInteger(2);
  var AddressLeftSibling := Stream.ReadInteger(Superblock.OffsetSize);
  var AddressRightSibling := Stream.ReadInteger(Superblock.OffsetSize);

  var Elements := 1;
  for var DimensionIndex := 0 to FDataObject.DataSpace.Dimensionality - 1 do
    Elements := Elements * FDataObject.DatalayoutChunk[DimensionIndex];

  var ElementSize := FDataObject.DatalayoutChunk[FDataObject.DataSpace.Dimensionality];

  var Output := JUint8Array.Create(Size);
  for var ElementIndex := 0 to 2 * EntriesUsed - 1 do
  begin
    if NodeType = 0 then
      Key := Stream.ReadInteger(Superblock.LengthsSize)
    else
    begin
      var ChunkSize := Stream.ReadInteger(4);
      var FilterMask := Stream.ReadInteger(4);
      if FilterMask <> 0 then
        raise Exception.Create(RStrAllFiltersMustBeEnabled);

      Start.Clear;
      for var DimensionIndex := 0 to DataObject.DataSpace.Dimensionality - 1 do
      begin
        var StartPos := Stream.ReadInteger(8);
        Start.Add(StartPos);
      end;

      var BreakCondition := Stream.ReadInteger(8);
      if BreakCondition <> 0 then
        Break;

      var ChildPointer := Stream.ReadInteger(Superblock.OffsetSize);

      // read data
      var StreamPos := Stream.Position;
      Stream.Position := ChildPointer;

      // read data from stream
      var ByteData := Stream.ReadBuffer(ChunkSize);
      var Inflate := JZlibInflate.Create(ByteData);
      var Input := JUint8Array(Inflate.decompress);
      Assert(Input.byteLength = Elements * ElementSize);

      case DataObject.DataSpace.Dimensionality of
        1:
          begin
            var sx := DataObject.DataSpace.FDimensionSize[0];
            for var ByteIndex := 0 to Elements * ElementSize - 1 do
            begin
              var b := ByteIndex div Elements;
              var x := ByteIndex mod Elements + Start[0];
              if (x < sx) then
                Output[x * ElementSize + b] := Input[ByteIndex];
            end;
          end;
        2:
          begin
            var sx := DataObject.DataSpace.FDimensionSize[0];
            var sy := DataObject.DataSpace.FDimensionSize[1];
            var dy := DataObject.DataLayoutChunk[1];
            for var ByteIndex := 0 to Elements * ElementSize - 1 do
            begin
              var b := ByteIndex div Elements;
              var x := ByteIndex mod Elements;
              var y := x mod dy + Start[1];
              x := x div dy + Start[0];
              if (y < sy) and (x < sx) then
                Output[(x * sy + y) * ElementSize + b] := Input[ByteIndex];
            end;
          end;
        3:
          begin
            var sx := DataObject.DataSpace.FDimensionSize[0];
            var sy := DataObject.DataSpace.FDimensionSize[1];
            var sz := DataObject.DataSpace.FDimensionSize[2];
            var dy := DataObject.DataLayoutChunk[1];
            var dz := DataObject.DataLayoutChunk[2];
            for var ByteIndex := 0 to Elements * ElementSize - 1 do
            begin
              var b := ByteIndex div Elements;
              var x := ByteIndex mod Elements;
              var z := (x mod dz) + Start[2];
              var y := (x div dz) mod dy + Start[1];
              x := (x div (dy * dz)) + Start[0];
              if (z < sz) and (y < sy) and (x < sx) then
                Output[(x * sz * sy + y * sz + z) * ElementSize + b] := Input[ByteIndex];
            end;
          end;
      end;

      Stream.Position := StreamPos;
    end;
  end;

  DataObject.Data.WriteBuffer(Output);

  var CheckSum := Stream.ReadInteger(4);
end;


{ THdfMessageLinkInfo }

procedure THdfMessageLinkInfo.LoadFromStream(Stream: TStream);
begin
  inherited LoadFromStream(Stream);

  // check version
  if FVersion <> 0 then
    raise Exception.Create(RStrUnsupportedVersionOfLinkInfoMessage);

  // read flags
  var Flags := Stream.ReadInteger(1);

  if (Flags and 1) <> 0 then
    Stream.ReadInteger(8);

  FFractalHeapAddress := Stream.ReadInteger(SuperBlock.OffsetSize);
  var AddressBTreeIndex := Stream.ReadInteger(SuperBlock.OffsetSize);

  if (Flags and 2) <> 0 then
    Stream.ReadInteger(SuperBlock.OffsetSize);
end;


{ THdfMessageGroupInfo }

procedure THdfMessageGroupInfo.LoadFromStream(Stream: TStream);
begin
  inherited LoadFromStream(Stream);

  // check version
  if FVersion <> 0 then
    raise Exception.Create(RStrUnsupportedVersionOfGroupInfoMessage);

  // read flags
  var Flags := Stream.ReadInteger(1);

  if (Flags and 1) <> 0 then
  begin
    var MaximumCompact := Stream.ReadInteger(2);
    var MinimumDense := Stream.ReadInteger(2);
  end;

  if (Flags and 2) <> 0 then
  begin
    var EstimatedNumberOfEntries := Stream.ReadInteger(2);
    var EstimatedLinkNameLength := Stream.ReadInteger(2);
  end;
end;


{ THdfMessageFilterPipeline }

procedure THdfMessageFilterPipeline.LoadFromStream(Stream: TStream);
begin
  inherited LoadFromStream(Stream);

  // check version
  if FVersion <> 2 then
    raise Exception.Create(RStrUnsupportedVersionOfTheFilterPipelineMessage);

  var Filters := Stream.ReadInteger(1);
  if Filters > 32 then
    raise Exception.Create(RStrTooManyFilters);

  for var Index := 0 to Filters - 1 do
  begin
    var FilterIdentificationValue := Stream.ReadInteger(2);
    if not FilterIdentificationValue in [1, 2] then
      raise Exception.Create(RStrUnsupportedFilter);
    var Flags := Stream.ReadInteger(2);
    var NumberClientDataValues := Stream.ReadInteger(2);
    for var ValueIndex := 0 to NumberClientDataValues - 1 do
      Stream.ReadInteger(4);
  end;
end;


{ THdfAttribute }

constructor THdfAttribute.Create(Name: String);
begin
  FName := Name;
  FStream := TStream.Create(JArrayBuffer.Create(0));
end;

function THdfAttribute.GetValueAsString: String;
begin
  if FStream.Size = 0 then
  begin
    Result := '';
    Exit;
  end;

  FStream.Position := 0;
  Result := FStream.ReadString(FStream.Size);
end;

procedure THdfAttribute.SetValueAsInteger(const Value: Integer);
begin
  FStream.Clear;
  FStream.WriteInteger(4, Value);
end;

function THdfAttribute.GetValueAsInteger: Integer;
begin
  FStream.Position := 0;
  Result := FStream.ReadInteger(4);
end;

procedure THdfAttribute.SetValueAsString(const Value: String);
begin
  FStream.Clear;
  FStream.WriteString(Value);
end;

{ THdfMessageAttribute }

procedure THdfMessageAttribute.ReadData(Stream: TStream; Attribute: THdfAttribute);
var
  Name: String;
  Value: Integer;
  Dimension: Integer;
  EndAddress: Integer;
begin
  case FDatatypeMessage.DataClass of
    3:
      begin
        SetLength(Name, FDatatypeMessage.Size);
        Name := Stream.ReadString(FDatatypeMessage.Size);
        Attribute.ValueAsString := Name;
      end;
    6:
      begin
        // TODO
        Stream.Seek(FDatatypeMessage.Size, True);
      end;
    7:
      begin
        Value := Stream.ReadInteger(4);
        Attribute.ValueAsInteger := Value;
        // TODO
      end;
    9:
      begin
        Dimension := Stream.ReadInteger(4);
        EndAddress := Stream.ReadInteger(4);

        Value := Stream.ReadInteger(4);
        Value := Stream.ReadInteger(4);
      end;
    else
      raise Exception.Create(RStrErrorUnknownDataClass);
  end;
end;

procedure THdfMessageAttribute.ReadDataDimension(Stream: TStream;
  Attribute: THdfAttribute; Dimension: Integer);
var
  Index: Integer;
begin
  if Length(FDataspaceMessage.FDimensionSize) > 0 then
    for Index := 0 to FDataspaceMessage.FDimensionSize[0] - 1 do
    begin
      if (1 < FDataspaceMessage.Dimensionality) then
        ReadDataDimension(Stream, Attribute, Dimension + 1)
      else
        ReadData(Stream, Attribute);
    end;
end;

procedure THdfMessageAttribute.LoadFromStream(Stream: TStream);
begin
  inherited LoadFromStream(Stream);

  // check version
  if FVersion <> 3 then
    raise Exception.Create(RStrUnsupportedVersionOfMessageAttribute);

  // read flags
  var Flags := Stream.ReadInteger(1);

  var NameSize := Stream.ReadInteger(2);
  var DatatypeSize := Stream.ReadInteger(2);
  var DataspaceSize := Stream.ReadInteger(2);
  var Encoding := Stream.ReadInteger(1);

  FName := Stream.ReadString(NameSize);

  FDatatypeMessage := THdfMessageDataType.Create(Superblock, DataObject);
  FDatatypeMessage.LoadFromStream(Stream);

  FDataspaceMessage := THdfMessageDataSpace.Create(Superblock, DataObject);
  FDataspaceMessage.LoadFromStream(Stream);

  var Attribute := THdfAttribute.Create(FName);
  DataObject.AddAttribute(Attribute);

  if FDataspaceMessage.Dimensionality = 0 then
    ReadData(Stream, Attribute)
  else
    ReadDataDimension(Stream, Attribute, 0);
end;

{ THdfMessageHeaderContinuation }

procedure THdfMessageHeaderContinuation.LoadFromStream(Stream: TStream);
var
  StreamPos: Integer;
  Signature: THdfSignature;
begin
  var Offset := Stream.ReadInteger(Superblock.OffsetSize);
  var LengthX := Stream.ReadInteger(Superblock.LengthsSize);

  StreamPos := Stream.Position;
  Stream.Position := Offset;

  // read signature
  Signature := Stream.ReadString(4);
  if Signature <> 'OCHK' then
    raise Exception.Create(Format(RStrWrongSignature, [Signature]));

  DataObject.ReadObjectHeaderMessages(Stream, Offset + LengthX);

  Stream.Position := StreamPos;
end;


{ THdfMessageAttributeInfo }

procedure THdfMessageAttributeInfo.LoadFromStream(Stream: TStream);
begin
  inherited LoadFromStream(Stream);

  // check version
  if FVersion <> 0 then
    raise Exception.Create(RStrUnsupportedVersionOfAttributeInfoMessage);

  // read flags
  var Flags := Stream.ReadInteger(1);

  if (Flags and 1) <> 0 then
    Stream.ReadInteger(2);

  FFractalHeapAddress := Stream.ReadInteger(SuperBlock.OffsetSize);
  var AttributeNameBTreeAddress := Stream.ReadInteger(SuperBlock.OffsetSize);

  if (Flags and 2) <> 0 then
    Stream.ReadInteger(SuperBlock.OffsetSize);
end;


{ THdfCustomBlock }

constructor THdfCustomBlock.Create(SuperBlock: THdfSuperBlock;
  FractalHeap: THdfFractalHeap; DataObject: THdfDataObject);
begin
  FSuperBlock := SuperBlock;
  FFractalHeap := FractalHeap;
  FDataObject := DataObject;
end;

procedure THdfCustomBlock.LoadFromStream(Stream: TStream);
begin
  // read signature
  var Signature := Stream.ReadString(4);
  if Signature <> GetSignature then
    raise Exception.Create(Format(RStrWrongSignature, [Signature]));

  // read version
  var Version := Stream.ReadInteger(1);
  if Version <> 0 then
    raise Exception.Create(RStrUnsupportedVersionOfCustomBlock);

  // read heap header address
  var HeapHeaderAddress := Stream.ReadInteger(SuperBlock.OffsetSize);

  // read block offset
  FBlockOffset := 0;
  FBlockOffset := Stream.ReadInteger((FFractalHeap.MaximumHeapSize + 7) div 8);
end;


{ THdfDirectBlock }

class function THdfDirectBlock.GetSignature: THdfSignature;
begin
  Result := 'FHDB';
end;

procedure THdfDirectBlock.LoadFromStream(Stream: TStream);
var
  OffsetSize, LengthSize: Integer;
  TypeAndVersion: Integer;
  HeapHeaderAddress: Integer;
  StreamPos: Integer;
  SubDataObject: THdfDataObject;
begin
  inherited LoadFromStream(Stream);

  if (FFractalHeap.Flags and 2) <> 0 then
    FChecksum := Stream.ReadInteger(4);

  OffsetSize := Ceil(log2(FFractalHeap.MaximumHeapSize) / 8);
  if (FFractalHeap.MaximumDirectBlockSize < FFractalHeap.MaximumSize) then
    LengthSize := Ceil(log2(FFractalHeap.MaximumDirectBlockSize) / 8)
  else
    LengthSize := Ceil(log2(FFractalHeap.MaximumSize) / 8);

  repeat
    TypeAndVersion := Stream.ReadInteger(1);

    var OffsetX := Stream.ReadInteger(OffsetSize);
    var LengthX := Stream.ReadInteger(LengthSize);

    if (TypeAndVersion = 3) then
    begin
      var Temp := Stream.ReadInteger(5);
      if Temp <> $40008 then
        raise Exception.Create(RStrUnsupportedValues);

      var Name := Stream.ReadString(LengthX);

      Temp := Stream.ReadInteger(4);
      if (Temp <> $13) then
        raise Exception.Create(RStrUnsupportedValues);

      LengthX := Stream.ReadInteger(2);
      var ValueType := Stream.ReadInteger(4);
      var TypeExtend := Stream.ReadInteger(2);
      var Value := '';
      if (ValueType = $20000) and (TypeExtend = 0) then
        Value := Stream.ReadString(LengthX);

      var Attribute := THdfAttribute.Create(Name);
      Attribute.ValueAsString := Value;

      FDataObject.AddAttribute(Attribute);
    end
    else
    if (TypeAndVersion = 1) then
    begin
      var Temp := Stream.ReadInteger(6);
      if Temp <> 0 then
        raise Exception.Create(RStrFHDBType1UnsupportedValues);

      // read name
      LengthX := Stream.ReadInteger(1);
      var Name := Stream.ReadString(LengthX);

      // read heap header address
      HeapHeaderAddress := Stream.ReadInteger(SuperBlock.OffsetSize);

      StreamPos := Stream.Position;

      Stream.Position := HeapHeaderAddress;

      SubDataObject := THdfDataObject.Create(SuperBlock, Name);
      SubDataObject.LoadFromStream(Stream);

      FDataObject.AddDataObject(SubDataObject);

      Stream.Position := StreamPos;
    end;
  until TypeAndVersion = 0;
end;


{ THdfIndirectBlock }

constructor THdfIndirectBlock.Create(SuperBlock: THdfSuperBlock;
  FractalHeap: THdfFractalHeap; DataObject: THdfDataObject);
begin
  inherited Create(SuperBlock, FractalHeap, DataObject);

  FInitialBlockSize := FractalHeap.StartingBlockSize;
end;

class function THdfIndirectBlock.GetSignature: THdfSignature;
begin
  Result := 'FHIB';
end;

procedure THdfIndirectBlock.LoadFromStream(Stream: TStream);
var
  RowsCount: Integer;
  k, n: Integer;
  ChildBlockAddress: Integer;
  SizeOfFilteredDirectBlock: Integer;
  FilterMaskForDirectBlock: Integer;
  StreamPosition: Integer;
  Block: THdfCustomBlock;
begin
  inherited LoadFromStream(Stream);

  if FBlockOffset <> 0 then
    raise Exception.Create(RStrZeroBlockOffset);

  // The number of rows of blocks, nrows, in an indirect block of size iblock_size is given by the following expression:
  RowsCount := Round(log2(FInitialBlockSize) - log2(FFractalHeap.StartingBlockSize)) + 1;

  // The maximum number of rows of direct blocks, max_dblock_rows, in any indirect block of a fractal heap is given by the following expression: */
  FMaximumNumberOfDirectBlockRows := Round(log2(FFractalHeap.MaximumDirectBlockSize)
      - log2(FFractalHeap.StartingBlockSize)) + 2;

  // Using the computed values for nrows and max_dblock_rows, along with the Width of the doubling table, the number of direct and indirect block entries (K and N in the indirect block description, below) in an indirect block can be computed:
  if (RowsCount < FMaximumNumberOfDirectBlockRows) then
    k := RowsCount * FFractalHeap.TableWidth
  else
    k := FMaximumNumberOfDirectBlockRows * FFractalHeap.TableWidth;

  // If nrows is less than or equal to max_dblock_rows, N is 0. Otherwise, N is simply computed:
  n := k - (FMaximumNumberOfDirectBlockRows * FFractalHeap.TableWidth);

  while (k > 0) do
  begin
    ChildBlockAddress := 0;
    ChildBlockAddress := Stream.ReadInteger(SuperBlock.OffsetSize);
    if (FFractalHeap.EncodedLength > 0) then
    begin
      SizeOfFilteredDirectBlock := Stream.ReadInteger(SuperBlock.LengthsSize);
      FilterMaskForDirectBlock := Stream.ReadInteger(4);
    end;

    if (ChildBlockAddress > 0) and (ChildBlockAddress < SuperBlock.EndOfFileAddress) then
    begin
      StreamPosition := Stream.Position;
      Stream.Position := ChildBlockAddress;

      Block := THdfDirectBlock.Create(SuperBlock, FFractalHeap, FDataObject);
      Block.LoadFromStream(Stream);

      Stream.Position := StreamPosition;
    end;
    Dec(k);
  end;

  while (n > 0) do
  begin
    ChildBlockAddress := 0;
    ChildBlockAddress := Stream.ReadInteger(SuperBlock.OffsetSize);

    if (ChildBlockAddress > 0) and (ChildBlockAddress < SuperBlock.EndOfFileAddress) then
    begin
      StreamPosition := Stream.Position;
      Stream.Position := ChildBlockAddress;

      Block := THdfInDirectBlock.Create(SuperBlock, FFractalHeap, FDataObject);
      Block.LoadFromStream(Stream);

      Stream.Position := StreamPosition;
    end;
    Dec(n);
  end;
end;


{ THdfFractalHeap }

constructor THdfFractalHeap.Create(SuperBlock: THdfSuperBlock; DataObject: THdfDataObject);
begin
  FSuperBlock := SuperBlock;
  FDataObject := DataObject;
end;

procedure THdfFractalHeap.LoadFromStream(Stream: TStream);
var
  Block: THdfCustomBlock;
begin
  // read signature
  FSignature := Stream.ReadString(4);
  if FSignature <> 'FRHP' then
    raise Exception.Create(Format(RStrWrongSignature, [FSignature]));

  // read version
  FVersion := Stream.ReadInteger(1);
  if FVersion <> 0 then
    raise Exception.Create(RStrUnsupportedVersionOfFractalHeap);

  FHeapIdLength := Stream.ReadInteger(2);
  FEncodedLength := Stream.ReadInteger(2);
  FFlags := Stream.ReadInteger(1);

  FMaximumSize := Stream.ReadInteger(4);
  FNextHugeID := Stream.ReadInteger(SuperBlock.LengthsSize);
  FBtreeAddresses := Stream.ReadInteger(SuperBlock.OffsetSize);
  FAmountFreeSpace := Stream.ReadInteger(SuperBlock.LengthsSize);
  FAddressManagedBlock := Stream.ReadInteger(SuperBlock.OffsetSize);
  FAmountManagedSpace := Stream.ReadInteger(SuperBlock.LengthsSize);
  FAmountAllocatedManagedSpace := Stream.ReadInteger(SuperBlock.LengthsSize);
  FOffsetDirectBlockAllocation := Stream.ReadInteger(SuperBlock.LengthsSize);
  FNumberOfManagedObjects := Stream.ReadInteger(SuperBlock.LengthsSize);
  FSizeOfHugeObjects := Stream.ReadInteger(SuperBlock.LengthsSize);
  FNumberOfHugeObjects := Stream.ReadInteger(SuperBlock.LengthsSize);
  FSizeOfTinyObjects := Stream.ReadInteger(SuperBlock.LengthsSize);
  FNumberOfTinyObjects := Stream.ReadInteger(SuperBlock.LengthsSize);
  FTableWidth := Stream.ReadInteger(2);
  FStartingBlockSize := Stream.ReadInteger(SuperBlock.LengthsSize);
  FMaximumDirectBlockSize := Stream.ReadInteger(SuperBlock.LengthsSize);
  FMaximumHeapSize := Stream.ReadInteger(2);
  FStartingNumber := Stream.ReadInteger(2);
  FAddressOfRootBlock := Stream.ReadInteger(SuperBlock.OffsetSize);
  FCurrentNumberOfRows := Stream.ReadInteger(2);
  if FEncodedLength > 0 then
  begin
    FSizeOfFilteredRootDirectBlock := Stream.ReadInteger(SuperBlock.LengthsSize);
    FIOFilterMask := Stream.ReadInteger(4);
  end;

  if (FNumberOfHugeObjects > 0) then
    raise Exception.Create(RStrNoHugeObjects);

  if (FNumberOfTinyObjects > 0) then
    raise Exception.Create(RStrNoTinyObjects);

  if (FAddressOfRootBlock > 0) and (FAddressOfRootBlock < Superblock.EndOfFileAddress) then
  begin
    Stream.Position := FAddressOfRootBlock;

    if FCurrentNumberOfRows <> 0 then
      Block := THdfIndirectBlock.Create(SuperBlock, Self, FDataObject)
    else
      Block := THdfDirectBlock.Create(SuperBlock, Self, FDataObject);
    Block.LoadFromStream(Stream);
  end;
end;


{ THdfDataObject }

constructor THdfDataObject.Create(SuperBlock: THdfSuperBlock);
begin
  FSuperblock := SuperBlock;
  FName := '';

  // create a few default messages
  FDataType := THdfMessageDataType.Create(FSuperBlock, Self);
  FDataSpace := THdfMessageDataSpace.Create(FSuperBlock, Self);
  FLinkInfo := THdfMessageLinkInfo.Create(FSuperBlock, Self);
  FGroupInfo := THdfMessageGroupInfo.Create(FSuperBlock, Self);
  FAttributeInfo := THdfMessageAttributeInfo.Create(FSuperBlock, Self);

  FAttributesHeap := THdfFractalHeap.Create(FSuperBlock, Self);
  FObjectsHeap := THdfFractalHeap.Create(FSuperBlock, Self);

  FData := TStream.Create(JArrayBuffer.Create(0));
end;

procedure THdfDataObject.AddAttribute(Attribute: THdfAttribute);
begin
  FAttributeList.Add(Attribute);
end;

procedure THdfDataObject.AddDataObject(DataObject: THdfDataObject);
begin
  FDataObjects.Add(DataObject);
end;

constructor THdfDataObject.Create(SuperBlock: THdfSuperBlock; Name: String);
begin
  Create(SuperBlock);
  FName := Name;
end;

function THdfDataObject.GetAttributeListCount: Integer;
begin
  Result := FAttributeList.Count;
end;

function THdfDataObject.GetAttributeListItem(Index: Integer): THdfAttribute;
begin
  if (Index < 0) or (Index >= FAttributeList.Count) then
    raise Exception.Create(Format(RStrIndexOutOfBounds, [Index]));

  Result := THdfAttribute(FAttributeList[Index]);
end;

function THdfDataObject.GetDataLayoutChunk(Index: Integer): Integer;
begin
  if (Index < 0) or (Index >= Length(FDataLayoutChunk)) then
    raise Exception.Create(Format(RStrIndexOutOfBounds, [Index]));

  Result := FDataLayoutChunk[Index];
end;

function THdfDataObject.GetDataLayoutChunkCount: Integer;
begin
  Result := Length(FDataLayoutChunk);
end;

function THdfDataObject.GetDataObject(Index: Integer): THdfDataObject;
begin
  if (Index < 0) or (Index >= FDataObjects.Count) then
    raise Exception.Create(Format(RStrIndexOutOfBounds, [Index]));

  Result := THdfDataObject(FDataObjects[Index]);
end;

function THdfDataObject.GetDataObjectCount: Integer;
begin
  Result := FDataObjects.Count;
end;

function THdfDataObject.HasAttribute(Name: string): Boolean;
var
  Index: Integer;
begin
  Result := False;
  for Index := 0 to AttributeListCount - 1 do
    if AttributeListItem[Index].Name = Name then
      exit(True);
end;

function THdfDataObject.GetAttribute(Name: string): string;
var
  Index: Integer;
begin
  Result := '';
  for Index := 0 to AttributeListCount - 1 do
    if AttributeListItem[Index].Name = Name then
      exit(AttributeListItem[Index].ValueAsString);
end;

procedure THdfDataObject.LoadFromStream(Stream: TStream);
begin
  FSignature := Stream.ReadString(4);
  if FSignature <> 'OHDR' then
    raise Exception.Create(Format(RStrWrongSignature, [string(FSignature)]));

  // read version
  FVersion := Stream.ReadInteger(1);
  if FVersion <> 2 then
    raise Exception.Create(RStrInvalidVersion);

  FFlags := Stream.ReadInteger(1);

  // eventually read time stamps
  if (FFlags and (1 shl 5)) <> 0 then
  begin
    FAccessTime := Stream.ReadInteger(4);
    FModificationTime := Stream.ReadInteger(4);
    FChangeTime := Stream.ReadInteger(4);
    FBirthTime := Stream.ReadInteger(4);
  end;

  // eventually skip number of attributes
  if (FFlags and (1 shl 4)) <> 0 then
  begin
    FMaximumCompact := Stream.ReadInteger(2);
    FMinimumDense := Stream.ReadInteger(2);
  end;

  FChunkSize := Stream.ReadInteger(1 shl (FFlags and 3));

  ReadObjectHeaderMessages(Stream, Stream.Position + FChunkSize);

  // parse message attribute info
  if (AttributeInfo.FractalHeapAddress > 0) and
     (AttributeInfo.FractalHeapAddress < FSuperblock.EndOfFileAddress) then
  begin
    Stream.Position := AttributeInfo.FractalHeapAddress;
    FAttributesHeap.LoadFromStream(Stream);
  end;

  // parse message link info
  if (LinkInfo.FractalHeapAddress > 0) and
     (LinkInfo.FractalHeapAddress < FSuperblock.EndOfFileAddress) then
  begin
    Stream.Position := LinkInfo.FractalHeapAddress;
    FObjectsHeap.LoadFromStream(Stream);
  end;
end;

procedure THdfDataObject.ReadObjectHeaderMessages(Stream: TStream; EndOfStream: Integer);
var
  MessageType: Integer;
  MessageSize: Integer;
  MessageFlags: Integer;
  EndPos: Integer;
  DataObjectMessage: THdfDataObjectMessage;
begin
  while Stream.Position < EndOfStream - 4 do
  begin
    MessageType := Stream.ReadInteger(1);
    MessageSize := Stream.ReadInteger(2);
    MessageFlags := Stream.ReadInteger(1);

    if (MessageFlags and not 5) <> 0 then
      raise Exception.Create(RStrUnsupportedOHDRMessageFlag);

    // eventually skip creation order
    if FFlags and (1 shl 2) <> 0 then
      Stream.Seek(2, True);

    EndPos := Stream.Position + MessageSize;

    DataObjectMessage := nil;
    case MessageType of
      0:
        Stream.Seek(MessageSize, True);
      1:
        DataObjectMessage := FDataSpace;
      2:
        DataObjectMessage := FLinkInfo;
      3:
        DataObjectMessage := FDataType;
      5:
        DataObjectMessage := THdfMessageDataFill.Create(FSuperBlock, Self);
      8:
        DataObjectMessage := THdfMessageDataLayout.Create(FSuperBlock, Self);
      10:
        DataObjectMessage := FGroupInfo;
      11:
        DataObjectMessage := THdfMessageFilterPipeline.Create(FSuperBlock, Self);
      12:
        DataObjectMessage := THdfMessageAttribute.Create(FSuperBlock, Self);
      16:
        DataObjectMessage := THdfMessageHeaderContinuation.Create(FSuperBlock, Self);
      21:
        DataObjectMessage := FAttributeInfo;
      else
        raise Exception.Create(Format('Unknown header message (%d)', [MessageType]));
    end;

    // now eventally load data object message
    if Assigned(DataObjectMessage) then
      DataObjectMessage.LoadFromStream(Stream);

    {$IFDEF IgnoreWrongPosition}
    Stream.Position := EndPos;
    {$ELSE}
    if Stream.Position <> EndPos then
      Assert(Stream.Position = EndPos);
    {$ENDIF}
  end;
end;


{ THdfFile }

constructor THdfFile.Create;
begin
  inherited Create;

  FSuperBlock := THdfSuperBlock.Create;
  FDataObject := THdfDataObject.Create(FSuperblock);
end;

function THdfFile.GetAttribute(Name: string): string;
begin
  Result := FDataObject.GetAttribute(Name);
end;

function THdfFile.HasAttribute(Name: string): Boolean;
begin
  Result := FDataObject.HasAttribute(Name);
end;

procedure THdfFile.LoadFromStream(Stream: TStream);
begin
  FSuperblock.LoadFromStream(Stream);
  FDataObject.LoadFromStream(Stream);
end;

procedure THdfFile.LoadFromBuffer(Buffer: JArrayBuffer);
begin
  LoadFromStream(TStream.Create(Buffer));
end;


{ TSofaFile }

function TSofaFile.GetDelay(Index: Integer): Float;
begin
  if (Index < 0) or (Index >= Length(FDelay)) then
    raise Exception.Create(Format(RStrIndexOutOfBounds, [Index]));

  Result := FDelay[Index];
end;

function TSofaFile.GetDelayCount: Integer;
begin
  Result := Length(FDelay);
end;

function TSofaFile.GetEmitterPositions(Index: Integer): TVector3;
begin
  if (Index < 0) or (Index >= Length(FEmitterPositions)) then
    raise Exception.Create(Format(RStrIndexOutOfBounds, [Index]));

  Result := FEmitterPositions[Index];
end;

function TSofaFile.GetImpulseResponse(MeasurementIndex,
  ReceiverIndex: Integer): JFloat64Array;
begin
  Result := FImpulseResponses[MeasurementIndex, ReceiverIndex];
end;

function TSofaFile.GetListenerPositions(Index: Integer): TVector3;
begin
  if (Index < 0) or (Index >= Length(FListenerPositions)) then
    raise Exception.Create(Format(RStrIndexOutOfBounds, [Index]));

  Result := FListenerPositions[Index];
end;

function TSofaFile.GetReceiverPositions(Index: Integer): TVector3;
begin
  if (Index < 0) or (Index >= Length(FReceiverPositions)) then
    raise Exception.Create(Format(RStrIndexOutOfBounds, [Index]));

  Result := FReceiverPositions[Index];
end;

function TSofaFile.GetSampleRate(Index: Integer): Float;
begin
  if (Index < 0) or (Index >= Length(FSampleRate)) then
    raise Exception.Create(Format(RStrIndexOutOfBounds, [Index]));

  Result := FSampleRate[Index];
end;

function TSofaFile.GetSampleRateCount: Integer;
begin
  Result := Length(FSampleRate);
end;

function TSofaFile.GetSourcePositions(Index: Integer): TVector3;
begin
  if (Index < 0) or (Index >= Length(FSourcePositions)) then
    raise Exception.Create(Format(RStrIndexOutOfBounds, [Index]));

  Result := FSourcePositions[Index];
end;

procedure TSofaFile.LoadFromBuffer(Buffer: JArrayBuffer);
var
  HdfFile: THdfFile;
  Index: Integer;
begin
  HdfFile := THdfFile.Create;
  try
    HdfFile.LoadFromBuffer(Buffer);
    if HdfFile.GetAttribute('Conventions') <> 'SOFA' then
      raise Exception.Create(RStrSofaConventionMissing);

    for Index := 0 to HdfFile.DataObject.DataObjectCount - 1 do
      ReadDataObject(HdfFile.DataObject.DataObject[Index]);

    for var Index := 0 to HdfFile.DataObject.AttributeListCount - 1 do
    begin
      var Attribute := HdfFile.DataObject.AttributeListItem[Index];
      var SofaAttribute: TSofaAttribute;
      SofaAttribute.Name := Attribute.Name;
      SofaAttribute.Value := Attribute.ValueAsString;
      FAttributes.Add(SofaAttribute);
    end;
  finally
    HdfFile.Free;
  end;
end;

procedure TSofaFile.ReadDataObject(DataObject: THdfDataObject);

  function GetDimension(Text: String): Integer;
  var
    TextPos: Integer;
  const
    CNetCdfDim = 'This is a netCDF dimension but not a netCDF variable.';
  begin
    Result := 0;
    TextPos := Pos(CNetCdfDim, Text);
    if TextPos > 0 then
    begin
      Delete(Text, TextPos, 53);
      Result := StrToInt(Trim(Text));
    end;
  end;

  function ConvertPosition(Position: TVector3): TVector3;
  begin
    Result.X := Position.Z * Cos(DegToRad(Position.Y)) * Cos(DegToRad(Position.X));
    Result.Y := Position.Z * Cos(DegToRad(Position.Y)) * Sin(DegToRad(Position.X));
    Result.Z := Position.Z * Sin(DegToRad(Position.Y));
  end;

const
  CClassIdentifier = 'CLASS';
  CDimensionScaleIdentifier = 'DIMENSION_SCALE';
  CNameIdentifier = 'NAME';
  CTypeIdentifier = 'Type';
  CCartesianIdentifier = 'cartesian';
begin
  DataObject.Data.Position := 0;
  if DataObject.Name = 'M' then
  begin
    Assert(DataObject.GetAttribute(CClassIdentifier) = CDimensionScaleIdentifier);
    FNumberOfMeasurements := GetDimension(DataObject.GetAttribute(CNameIdentifier));
  end
  else if DataObject.Name = 'R' then
  begin
    Assert(DataObject.GetAttribute(CClassIdentifier) = CDimensionScaleIdentifier);
    FNumberOfReceivers := GetDimension(DataObject.GetAttribute(CNameIdentifier));
  end
  else if DataObject.Name = 'E' then
  begin
    Assert(DataObject.GetAttribute(CClassIdentifier) = CDimensionScaleIdentifier);
    FNumberOfEmitters := GetDimension(DataObject.GetAttribute(CNameIdentifier));
  end
  else if DataObject.Name = 'N' then
  begin
    Assert(DataObject.GetAttribute(CClassIdentifier) = CDimensionScaleIdentifier);
    FNumberOfDataSamples := GetDimension(DataObject.GetAttribute(CNameIdentifier));
  end
  else if DataObject.Name = 'S' then
  begin
    Assert(DataObject.GetAttribute(CClassIdentifier) = CDimensionScaleIdentifier);
    var ItemCount := GetDimension(DataObject.GetAttribute(CNameIdentifier));
  end
  else if DataObject.Name = 'I' then
  begin
    Assert(DataObject.GetAttribute(CClassIdentifier) = CDimensionScaleIdentifier);
    var ItemCount := GetDimension(DataObject.GetAttribute(CNameIdentifier));
  end
  else if DataObject.Name = 'C' then
  begin
    Assert(DataObject.GetAttribute(CClassIdentifier) = CDimensionScaleIdentifier);
    var ItemCount := GetDimension(DataObject.GetAttribute(CNameIdentifier));
  end
  else if DataObject.Name = 'ListenerPosition' then
  begin
    Assert(DataObject.Data.Size > 0);
    var ItemCount := DataObject.Data.Size div (3 * DataObject.DataType.Size);
    Assert(DataObject.DataType.DataClass = 1);

    var IsCartesian := True;
    if DataObject.HasAttribute(CTypeIdentifier) then
      IsCartesian := DataObject.GetAttribute(CTypeIdentifier) = CCartesianIdentifier;

    for var Index := 0 to ItemCount - 1 do
    begin
      var Position: TVector3;
      Position.X := DataObject.Data.ReadFloat(8);
      Position.Y := DataObject.Data.ReadFloat(8);
      Position.Z := DataObject.Data.ReadFloat(8);
      if not IsCartesian then
        Position := ConvertPosition(Position);
      FListenerPositions.Add(Position);
    end;
  end
  else if DataObject.Name = 'ReceiverPosition' then
  begin
    Assert(DataObject.Data.Size > 0);
    var ItemCount := DataObject.Data.Size div (3 * DataObject.DataType.Size);
    Assert(DataObject.DataType.DataClass = 1);

    var IsCartesian := True;
    if DataObject.HasAttribute(CTypeIdentifier) then
      IsCartesian := DataObject.GetAttribute(CTypeIdentifier) = CCartesianIdentifier;

    for var Index := 0 to ItemCount - 1 do
    begin
      var Position: TVector3;
      Position.X := DataObject.Data.ReadFloat(8);
      Position.Y := DataObject.Data.ReadFloat(8);
      Position.Z := DataObject.Data.ReadFloat(8);
      if not IsCartesian then
        Position := ConvertPosition(Position);
      FReceiverPositions.Add(Position);
    end;
  end
  else if DataObject.Name = 'SourcePosition' then
  begin
    Assert(DataObject.Data.Size > 0);
    var ItemCount := DataObject.Data.Size div (3 * DataObject.DataType.Size);
    FNumberOfSources := ItemCount;
    Assert(DataObject.DataType.DataClass = 1);

    var IsCartesian := True;
    if DataObject.HasAttribute(CTypeIdentifier) then
      IsCartesian := DataObject.GetAttribute(CTypeIdentifier) = CCartesianIdentifier;

    for var Index := 0 to ItemCount - 1 do
    begin
      var Position: TVector3;
      Position.X := DataObject.Data.ReadFloat(8);
      Position.Y := DataObject.Data.ReadFloat(8);
      Position.Z := DataObject.Data.ReadFloat(8);
      if not IsCartesian then
        Position := ConvertPosition(Position);
      FSourcePositions.Add(Position);
    end;
  end
  else if DataObject.Name = 'EmitterPosition' then
  begin
    Assert(DataObject.Data.Size > 0);
    var ItemCount := DataObject.Data.Size div (3 * DataObject.DataType.Size);
    Assert(DataObject.DataType.DataClass = 1);

    var IsCartesian := True;
    if DataObject.HasAttribute(CTypeIdentifier) then
      IsCartesian := DataObject.GetAttribute(CTypeIdentifier) = CCartesianIdentifier;

    for var Index := 0 to ItemCount - 1 do
    begin
      var Position: TVector3;
      Position.X := DataObject.Data.ReadFloat(8);
      Position.Y := DataObject.Data.ReadFloat(8);
      Position.Z := DataObject.Data.ReadFloat(8);
      if not IsCartesian then
        Position := ConvertPosition(Position);
      FEmitterPositions.Add(Position);
    end;
  end
  else if DataObject.Name = 'ListenerUp' then
  begin
    Assert(DataObject.Data.Size > 0);
    Assert(DataObject.DataType.DataClass = 1);
    FListenerUp.X := DataObject.Data.ReadFloat(8);
    FListenerUp.Y := DataObject.Data.ReadFloat(8);
    FListenerUp.Z := DataObject.Data.ReadFloat(8);
  end
  else if DataObject.Name = 'ListenerView' then
  begin
    Assert(DataObject.Data.Size > 0);
    Assert(DataObject.DataType.DataClass = 1);
    FListenerView.X := DataObject.Data.ReadFloat(8);
    FListenerView.Y := DataObject.Data.ReadFloat(8);
    FListenerView.Z := DataObject.Data.ReadFloat(8);
  end
  else if DataObject.Name = 'Data.IR' then
  begin
    Assert(DataObject.Data.Size > 0);
    var ItemCount := FNumberOfMeasurements * FNumberOfReceivers * FNumberOfDataSamples * 8;
    Assert(DataObject.Data.Size = ItemCount);

    FImpulseResponses.SetLength(FNumberOfMeasurements);
    for var MeasurementIndex := 0 to FNumberOfMeasurements - 1 do
    begin
      FImpulseResponses[MeasurementIndex].SetLength(FNumberOfReceivers);
      for var ReceiverIndex := 0 to FNumberOfReceivers - 1 do
      begin
        var ImpulseResponse := JFloat64Array.Create(FNumberOfDataSamples);

        for var Index := 0 to FNumberOfDataSamples - 1 do
          ImpulseResponse[Index] := DataObject.Data.ReadFloat(8);

        FImpulseResponses[MeasurementIndex, ReceiverIndex] := ImpulseResponse;
      end;
    end;
  end
  else if DataObject.Name = 'Data.SamplingRate' then
  begin
    Assert(DataObject.Data.Size > 0);
    var ItemCount := DataObject.Data.Size div DataObject.DataType.Size;
    for var Index := 0 to ItemCount - 1 do
    begin
      var SampleRate := DataObject.Data.ReadFloat(8);
      FSampleRate.Add(SampleRate);
    end;
  end
  else if DataObject.Name = 'Data.Delay' then
  begin
    Assert(DataObject.Data.Size > 0);
    var ItemCount := DataObject.Data.Size div DataObject.DataType.Size;
    for var Index := 0 to ItemCount - 1 do
    begin
      var Delay := DataObject.Data.ReadFloat(8);
      FDelay.Add(Delay);
    end;
  end;
end;

function LoadSofaFile(Buffer: JArrayBuffer): TSofaFile;
begin
  Result := TSofaFile.Create;
  Result.LoadFromBuffer(Buffer);
end;

function GetSofaAttribute(SofaFile: TSofaFile; const AttributeName: String): String;
begin
  Result := '';
  for var Attribute in SofaFile.Attributes do
    if Attribute.Name = AttributeName then
      exit(Attribute.Value);;
end;

end.