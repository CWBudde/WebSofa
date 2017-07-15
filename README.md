# WebSofa
WebSofa is a JavaScript library for reading SOFA files. It is written in Object Pascal, but easily transcompiles to JavaScript using the [Hope](https://github.com/Walibeiro/Hope) command line compiler.

WebSofa makes use of the [WebHdf](https://github.com/CWBudde/WebSofa) code to read Hdf files.

## Online Demo
Since the compiled JavaScript code can run easily in any browser, a simple demo is available [here](https://rawgit.com/CWBudde/WebSofa/master/Demo/www/index.html)

## Usage
While the source of this code is aimed to transcompile from Object Pascal to monolithic JavaScript code including everything, a dedicated library 'Sofa.js' is available as well. With this it's easy to add SOFA to any website or web-app. It should include everything to load and handle SOFA files.

For now, the API is kept very simple and C-like. In the future a more JavaScript like API will be added.

In order to load a sofa file you must first load the file into a UInt8Array buffer. Typically this can be achieved by an [Xml HTTP Request](https://en.wikipedia.org/wiki/XMLHttpRequest) or with the help of a [FileReader](https://www.w3.org/TR/file-upload/).

Once you have the content of a file as an array buffer you can load it with

    var handle = sofaLoadFile(Buffer);

This will return a handle to a sofa file. The handle (which is in fact a complex JavaScript object) you can access all the other features from the specification. For example to get the title of a sof file call:

    var title = sofaGetAttribute(handle, 'Title');

However, the more interesting information are the HRTF filters. To obtain a filter call

    var filter = sofaGetFilterCartesian(handle, x, y, z);
    
in cartesian coordinates or if you prefer spherical coordinates call

    var filter = sofaGetFilterSpherical(handle, phi, theta, radius);

Both functions will return the closest HRTF filter to the given position in a JavaScript object. This object contains the following values:

    {
      SampleRate //Number
      Left, Right // Float64Array
      LeftDelay, RightDelay // Number
    }

While these are the basic information to run a spacial audio renderer, you might need to do a few more steps before. In case of a typical [Web Audio API](https://www.w3.org/TR/webaudio/) implementation you would need at least to convert the 64-bit floating point data to 32-bit. This step is pretty straight forward:

     var Left32 = new Float32Array(filter.Left);
     var Right32 = new Float32Array(filter.Right);

Next it's likely that you need to match the samplerate. This can be done quick and dirty by using the offline context of the Web Audio API like:

      if (AudioContext.sampleRate!=filter.SampleRate) {
        var OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        OfflineAudioContext = new OfflineAudioContext(2, Left32.length, AudioContext.sampleRate);
        ...

The resulting buffer can then be used in a convolver node (from the Web Audio API).

## Roadmap
At the moment no HRTF interpolation is performed nor does the library contain any audio processing code (such as a sophisticated  resampler to match the sample rate). Finally, the performance hasn't yet been optimized so far. All this is on my list for future updates, but given the fact that this is a hobby project there is no time schedule for this.

## Disclaimer
The code slightly relates to [libmysofa](https://github.com/hoene/libmysofa). However, it is written mostly from scratch. Similarities might occur from the fact that both are meant for the same purpose and using the same underlying specification.

However, thanks to [Christian Hoene](mailto:christian.hoene@symonics.com) who wrote and published the libmysofa library. Without his reverse engineering of some (rather undocumented) parts of the specification it wouldn't have been possible to create this code.
