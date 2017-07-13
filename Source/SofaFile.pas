unit SofaFile;

interface

uses
  ECMA.TypedArray, HdfFile;

type
  TVector3 = record
    X, Y, Z: Float;
  end;

  TArrayOfFloat = array of Float;

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
    FImpulseResponses: array of array of TArrayOfFloat;
    FDelay: array of Float;
    FDateModified: string;
    FHistory: string;
    FComment: string;
    FLicense: string;
    FAPIVersion: string;
    FAPIName: string;
    FOrigin: string;
    FTitle: string;
    FDateCreated: string;
    FReferences: string;
    FDataType: string;
    FOrganization: string;
    FRoomType: string;
    FApplicationVersion: string;
    FApplicationName: string;
    FAuthorContact: string;
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
    function GetImpulseResponse(MeasurementIndex, ReceiverIndex: Integer): TArrayOfFloat;
  public
    procedure LoadFromBuffer(Buffer: JArrayBuffer);
    procedure SaveToBuffer(Buffer: JArrayBuffer);

    property DataType: string read FDataType;
    property RoomType: string read FRoomType;
    property Title: string read FTitle;
    property DateCreated: string read FDateCreated;
    property DateModified: string read FDateModified;
    property APIName: string read FAPIName;
    property APIVersion: string read FAPIVersion;
    property AuthorContact: string read FAuthorContact;
    property Organization: string read FOrganization;
    property License: string read FLicense;
    property ApplicationName: string read FApplicationName;
    property ApplicationVersion: string read FApplicationVersion;
    property Comment: string read FComment;
    property History: string read FHistory;
    property References: string read FReferences;
    property Origin: string read FOrigin;

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
    property ImpulseResponse[MeasurementIndex, ReceiverIndex: Integer]: TArrayOfFloat read GetImpulseResponse;
    property SampleRate[Index: Integer]: Float read GetSampleRate;
    property SampleRateCount: Integer read GetSampleRateCount;
    property Delay[Index: Integer]: Float read GetDelay;
    property DelayCount: Integer read GetDelayCount;
  end;

implementation


{ TSofaFile }

function TSofaFile.GetDelay(Index: Integer): Float;
begin
  if (Index < 0) or (Index >= Length(FDelay)) then
    raise Exception.Create(Format('Index out of bounds (%d)', [Index]));

  Result := FDelay[Index];
end;

function TSofaFile.GetDelayCount: Integer;
begin
  Result := Length(FDelay);
end;

function TSofaFile.GetEmitterPositions(Index: Integer): TVector3;
begin
  if (Index < 0) or (Index >= Length(FEmitterPositions)) then
    raise Exception.Create(Format('Index out of bounds (%d)', [Index]));

  Result := FEmitterPositions[Index];
end;

function TSofaFile.GetImpulseResponse(MeasurementIndex,
  ReceiverIndex: Integer): TArrayOfFloat;
begin
  Result := FImpulseResponses[MeasurementIndex, ReceiverIndex];
end;

function TSofaFile.GetListenerPositions(Index: Integer): TVector3;
begin
  if (Index < 0) or (Index >= Length(FListenerPositions)) then
    raise Exception.Create(Format('Index out of bounds (%d)', [Index]));

  Result := FListenerPositions[Index];
end;

function TSofaFile.GetReceiverPositions(Index: Integer): TVector3;
begin
  if (Index < 0) or (Index >= Length(FReceiverPositions)) then
    raise Exception.Create(Format('Index out of bounds (%d)', [Index]));

  Result := FReceiverPositions[Index];
end;

function TSofaFile.GetSampleRate(Index: Integer): Float;
begin
  if (Index < 0) or (Index >= Length(FSampleRate)) then
    raise Exception.Create(Format('Index out of bounds (%d)', [Index]));

  Result := FSampleRate[Index];
end;

function TSofaFile.GetSampleRateCount: Integer;
begin
  Result := Length(FSampleRate);
end;

function TSofaFile.GetSourcePositions(Index: Integer): TVector3;
begin
  if (Index < 0) or (Index >= Length(FSourcePositions)) then
    raise Exception.Create(Format('Index out of bounds (%d)', [Index]));

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
      raise Exception.Create('File does not contain the SOFA convention');

    for Index := 0 to HdfFile.DataObject.DataObjectCount - 1 do
      ReadDataObject(HdfFile.DataObject.DataObject[Index]);

    ReadAttributes(HdfFile.DataObject);
  finally
    HdfFile.Free;
  end;
end;

procedure TSofaFile.ReadDataObject(DataObject: THdfDataObject);

  function GetDimension(Text: string): Integer;
  var
    TextPos: Integer;
  begin
    Result := 0;
    TextPos := Pos('This is a netCDF dimension but not a netCDF variable.', Text);
    if TextPos > 0 then
    begin
      Delete(Text, TextPos, 53);
      Result := StrToInt(Trim(Text));
    end;
  end;

begin
  DataObject.Data.Position := 0;
  if DataObject.Name = 'M' then
  begin
    Assert(DataObject.GetAttribute('CLASS') = 'DIMENSION_SCALE');
    FNumberOfMeasurements := GetDimension(DataObject.GetAttribute('NAME'));
  end
  else if DataObject.Name = 'R' then
  begin
    Assert(DataObject.GetAttribute('CLASS') = 'DIMENSION_SCALE');
    FNumberOfReceivers := GetDimension(DataObject.GetAttribute('NAME'));
  end
  else if DataObject.Name = 'E' then
  begin
    Assert(DataObject.GetAttribute('CLASS') = 'DIMENSION_SCALE');
    FNumberOfEmitters := GetDimension(DataObject.GetAttribute('NAME'));
  end
  else if DataObject.Name = 'N' then
  begin
    Assert(DataObject.GetAttribute('CLASS') = 'DIMENSION_SCALE');
    FNumberOfDataSamples := GetDimension(DataObject.GetAttribute('NAME'));
  end
  else if DataObject.Name = 'S' then
  begin
    Assert(DataObject.GetAttribute('CLASS') = 'DIMENSION_SCALE');
    var ItemCount := GetDimension(DataObject.GetAttribute('NAME'));
  end
  else if DataObject.Name = 'I' then
  begin
    Assert(DataObject.GetAttribute('CLASS') = 'DIMENSION_SCALE');
    var ItemCount := GetDimension(DataObject.GetAttribute('NAME'));
  end
  else if DataObject.Name = 'C' then
  begin
    Assert(DataObject.GetAttribute('CLASS') = 'DIMENSION_SCALE');
    var ItemCount := GetDimension(DataObject.GetAttribute('NAME'));
  end
  else if DataObject.Name = 'ListenerPosition' then
  begin
    Assert(DataObject.Data.Size > 0);
    var ItemCount := DataObject.Data.Size div (3 * DataObject.DataType.Size);
    Assert(DataObject.DataType.DataClass = 1);
    for var Index := 0 to ItemCount - 1 do
    begin
      var Position: TVector3;
      Position.X := DataObject.Data.ReadFloat(8);
      Position.Y := DataObject.Data.ReadFloat(8);
      Position.Z := DataObject.Data.ReadFloat(8);
      FListenerPositions.Add(Position);
    end;
  end
  else if DataObject.Name = 'ReceiverPosition' then
  begin
    Assert(DataObject.Data.Size > 0);
    var ItemCount := DataObject.Data.Size div (3 * DataObject.DataType.Size);
    Assert(DataObject.DataType.DataClass = 1);
    for var Index := 0 to ItemCount - 1 do
    begin
      var Position: TVector3;
      Position.X := DataObject.Data.ReadFloat(8);
      Position.Y := DataObject.Data.ReadFloat(8);
      Position.Z := DataObject.Data.ReadFloat(8);
      FReceiverPositions.Add(Position);
    end;
  end
  else if DataObject.Name = 'SourcePosition' then
  begin
    Assert(DataObject.Data.Size > 0);
    var ItemCount := DataObject.Data.Size div (3 * DataObject.DataType.Size);
    FNumberOfSources := ItemCount;
    Assert(DataObject.DataType.DataClass = 1);
    for var Index := 0 to ItemCount - 1 do
    begin
      var Position: TVector3;
      Position.X := DataObject.Data.ReadFloat(8);
      Position.Y := DataObject.Data.ReadFloat(8);
      Position.Z := DataObject.Data.ReadFloat(8);
      FSourcePositions.Add(Position);
    end;
  end
  else if DataObject.Name = 'EmitterPosition' then
  begin
    Assert(DataObject.Data.Size > 0);
    var ItemCount := DataObject.Data.Size div (3 * DataObject.DataType.Size);
    Assert(DataObject.DataType.DataClass = 1);
    for var Index := 0 to ItemCount - 1 do
    begin
      var Position: TVector3;
      Position.X := DataObject.Data.ReadFloat(8);
      Position.Y := DataObject.Data.ReadFloat(8);
      Position.Z := DataObject.Data.ReadFloat(8);
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
        FImpulseResponses[MeasurementIndex, ReceiverIndex].SetLength(FNumberOfDataSamples);
        for var Index := 0 to FNumberOfDataSamples - 1 do
          FImpulseResponses[MeasurementIndex, ReceiverIndex, Index] := DataObject.Data.ReadFloat(8);
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
    if DataObject.AttributeListItem[Index].Name = 'DateModified' then
      FDateModified := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'History' then
      FHistory := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'Comment' then
      FComment := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'License' then
      FLicense := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'FAPIVersion: tring;' then
      FAPIVersion := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'APIName' then
      FAPIName := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'Origin' then
      FOrigin := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'Title' then
      FTitle := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'DateCreated' then
      FDateCreated := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'References' then
      FReferences := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'DataType' then
      FDataType := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'Organization' then
      FOrganization := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'RoomType' then
      FRoomType := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'ApplicationVersion' then
      FApplicationVersion := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'ApplicationName' then
      FApplicationName := string(DataObject.AttributeListItem[Index].ValueAsString);
    if DataObject.AttributeListItem[Index].Name = 'AuthorContact' then
      FAuthorContact := string(DataObject.AttributeListItem[Index].ValueAsString);
  end;
end;

procedure TSofaFile.SaveToBuffer(Buffer: JArrayBuffer);
begin
  raise Exception.Create('Not yet implemented');
end;

end.
