unit Demo.Hrtf;

interface

uses
  ECMA.TypedArray, SimpleSofaFile;

type
  THrtfMeasurement = class
  private
    FPosition: TVector3;
    FLeft: JFloat32Array;
    FRight: JFloat32Array;
  public
    constructor Create(Position: TVector3; Left, Right: JFloat32Array);

    function GetMaxLevel: Float;

    property Position: TVector3 read FPosition;
    property Left: JFloat32Array read FLeft;
    property Right: JFloat32Array read FRight;
  end;

  THrtfs = class
  private
	  FSampleFrames: Integer;
	  FSampleRate: Float;
    FScaleFactor: Float;
    FMeasurements: array of THrtfMeasurement;
    function GetMeasurement(Index: Integer): THrtfMeasurement;
  public
    constructor Create(SofaFile: TSofaFile);

    property SampleFrames: Integer read FSampleFrames;
    property SampleRate: Float read FSampleRate;
    property MeasurementCount: Integer read (Length(FMeasurements));
    property Measurement[Index: Integer]: THrtfMeasurement read GetMeasurement;
    property ScaleFactor: Float read FScaleFactor;
  end;

implementation

uses
  WHATWG.Console, ECMA.Base64;

{ THrtfMeasurement }

constructor THrtfMeasurement.Create(Position: TVector3; Left, Right: JFloat32Array);
begin
  FPosition := Position;
  FLeft := Left;
  FRight := Right;
end;

function THrtfMeasurement.GetMaxLevel: Float;
begin
  Result := 0;
  for var Index := 0 to Left.length - 1 do
    if Abs(Left[Index]) > Result then
      Result := Abs(Left[Index]);

  for var Index := 0 to Right.length - 1 do
    if Abs(Right[Index]) > Result then
      Result := Abs(Right[Index]);
end;

{ THrtfs }

constructor THrtfs.Create(SofaFile: TSofaFile);
begin
  FSampleFrames := SofaFile.NumberOfDataSamples;
  FSampleRate := SofaFile.SampleRate[0];
  Assert(SofaFile.NumberOfMeasurements = SofaFile.NumberOfSources);

  // find minimum z position
  var MinZ := Abs(SofaFile.SourcePositions.GetPosition(0, False)[2]);
  for var MeasurementIndex := 1 to SofaFile.NumberOfMeasurements - 1 do
  begin
    var Position := SofaFile.SourcePositions.GetPosition(MeasurementIndex, False);
    if Abs(Position[2]) < MinZ then
      MinZ := Abs(Position[2]);
  end;

  for var MeasurementIndex := 0 to SofaFile.NumberOfMeasurements - 1 do
  begin
    var Position := SofaFile.SourcePositions.GetPosition(MeasurementIndex, False);
    // only consider the horizontal plane (more or less)
    if Abs(Position[2]) > MinZ then
      continue;

    Assert(SofaFile.NumberOfReceivers >= 2);

    FMeasurements.Add(THrtfMeasurement.Create(Position,
      JFloat32Array.Create(JFloat32Array(SofaFile.ImpulseResponse[MeasurementIndex, 0])),
      JFloat32Array.Create(JFloat32Array(SofaFile.ImpulseResponse[MeasurementIndex, 1]))));
  end;

  // normalize level
  var GlobalMaxLevel := 0.0;
  for var Measurement in FMeasurements do
  begin
    var MaxLevel := Measurement.GetMaxLevel;
    if MaxLevel > GlobalMaxLevel then
      GlobalMaxLevel := MaxLevel;
  end;

  FScaleFactor := if GlobalMaxLevel <> 0 then 1 / GlobalMaxLevel else 1;
end;

function THrtfs.GetMeasurement(Index: Integer): THrtfMeasurement;
begin
  if (Index < 0) and (Index >= Length(FMeasurements)) then
    raise Exception.Create('Index out of bounds');

  Result := FMeasurements[Index];
end;

end.