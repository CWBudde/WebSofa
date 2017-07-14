unit SofaFile;

interface

uses
  ECMA.TypedArray, HdfFile;

type
  TVector3 = record
    X, Y, Z: Float;
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
    FDateModified: String;
    FHistory: String;
    FComment: String;
    FLicense: String;
    FAPIVersion: String;
    FAPIName: String;
    FOrigin: String;
    FTitle: String;
    FDateCreated: String;
    FReferences: String;
    FDataType: String;
    FOrganization: String;
    FRoomLocation: String;
    FRoomType: String;
    FApplicationVersion: String;
    FApplicationName: String;
    FAuthorContact: String;
    FNumberOfSources: Integer;
    procedure ReadAttributes(DataObject: THdfDataObject);
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
    procedure SaveToBuffer(Buffer: JArrayBuffer);

    property DataType: String read FDataType;
    property RoomType: String read FRoomType;
    property RoomLocation: String read FRoomLocation;
    property Title: String read FTitle;
    property DateCreated: String read FDateCreated;
    property DateModified: String read FDateModified;
    property APIName: String read FAPIName;
    property APIVersion: String read FAPIVersion;
    property AuthorContact: String read FAuthorContact;
    property Organization: String read FOrganization;
    property License: String read FLicense;
    property ApplicationName: String read FApplicationName;
    property ApplicationVersion: String read FApplicationVersion;
    property Comment: String read FComment;
    property History: String read FHistory;
    property References: String read FReferences;
    property Origin: String read FOrigin;

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

implementation

uses
  WHATWG.Console;

resourcestring
  RStrIndexOutOfBounds = 'Index out of bounds (%d)';
  RStrSofaConventionMissing = 'File does not contain the SOFA convention';


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

    ReadAttributes(HdfFile.DataObject);
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

procedure TSofaFile.ReadAttributes(DataObject: THdfDataObject);
var
  Index: Integer;
begin
  for Index := 0 to DataObject.AttributeListCount - 1 do
  begin
    var Attribute := DataObject.AttributeListItem[Index];
    var AttributeName := Attribute.Name;
    if AttributeName = 'DateModified' then
      FDateModified := Attribute.ValueAsString;
    if AttributeName = 'History' then
      FHistory := Attribute.ValueAsString;
    if AttributeName = 'Comment' then
      FComment := Attribute.ValueAsString;
    if AttributeName = 'License' then
      FLicense := Attribute.ValueAsString;
    if AttributeName = 'APIVersion' then
      FAPIVersion := Attribute.ValueAsString;
    if AttributeName = 'APIName' then
      FAPIName := Attribute.ValueAsString;
    if AttributeName = 'Origin' then
      FOrigin := Attribute.ValueAsString;
    if AttributeName = 'Title' then
      FTitle := Attribute.ValueAsString;
    if AttributeName = 'DateCreated' then
      FDateCreated := Attribute.ValueAsString;
    if AttributeName = 'References' then
      FReferences := Attribute.ValueAsString;
    if AttributeName = 'DataType' then
      FDataType := Attribute.ValueAsString;
    if AttributeName = 'Organization' then
      FOrganization := Attribute.ValueAsString;
    if AttributeName = 'RoomLocation' then
      FRoomLocation := Attribute.ValueAsString;
    if AttributeName = 'RoomType' then
      FRoomType := Attribute.ValueAsString;
    if AttributeName = 'ApplicationVersion' then
      FApplicationVersion := Attribute.ValueAsString;
    if AttributeName = 'ApplicationName' then
      FApplicationName := Attribute.ValueAsString;
    if AttributeName = 'AuthorContact' then
      FAuthorContact := Attribute.ValueAsString;
  end;
end;

procedure TSofaFile.SaveToBuffer(Buffer: JArrayBuffer);
begin
  raise Exception.Create('Not yet implemented');
end;

function LoadSofaFile(Buffer: JArrayBuffer): TSofaFile;
begin
  Result := TSofaFile.Create;
  Result.LoadFromBuffer(Buffer);
end;

end.