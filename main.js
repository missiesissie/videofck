$(document).ready(function () {
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  }
  var yt = getUrlVars()["youtube"];
  var ytid = decodeURI(yt);

  var vTime = "0s";
  if (getUrlVars()["youtube"] !== undefined) {
    if (getUrlVars()["t"] !== undefined) {
      vTime = getUrlVars()["t"];
    }
    $("#input1").val(
      "https://www.youtube.com/watch?v=" +
        getUrlVars()["youtube"].replace("?", "&") +
        "&t=" +
        vTime
    );
  }
  if (getUrlVars()["image"] !== undefined) {
    var vImg = decodeURI(getUrlVars()["image"]);
    $("#input1").val(vImg);
  }
  if (getUrlVars()["mode"] !== undefined) {
    var vMode = decodeURI(getUrlVars()["mode"]);
    $("#mode").val(vMode);
  }

  if (getUrlVars()["strobespeed"] !== undefined) {
    $("#strobespeed").val(decodeURI(getUrlVars()["strobespeed"]));
    $("#myRange").val(decodeURI(getUrlVars()["strobespeed"]) / 100);
  }

  if (getUrlVars()["pornhub2"] !== undefined) {
    $("#input1").val(
      "https://www.pornhub.com/view_video.php?viewkey=" +
        getUrlVars()["pornhub2"]
    );
  }
  if (getUrlVars()["pornhub"] !== undefined) {
    if (getUrlVars()["t"] !== undefined) {
      vTime = getUrlVars()["t"];
    }
    $("#input2").val(
      "https://www.pornhub.com/view_video.php?viewkey=" +
        getUrlVars()["pornhub"]
    );
    setTimeout(function () {
      $("#make").trigger("click");
    }, 600);
  }
  if (getUrlVars()["mp4"] !== undefined) {
    $("#input2").val(getUrlVars()["mp4"]);
  }

  //localfile
  const localshow = (e) => {
    let url = URL.createObjectURL(e.files[0]);
    let video = document.querySelector("#localvideo");
    video.setAttribute("src", url);
    video.play();
  };

  // HERE WE MAKE COOKIES=========================================================
  $("#make").on("click", function () {
    console.log("test:" + $("#localvideoloader").val());
    //https://www.youtube.com/watch?v=J9iAXz6pxUY&t=251s
    //https://youtu.be/J9iAXz6pxUY?t=251

    $("#input1").val(
      $("#input1")
        .val()
        .replace("youtu.be/", "www.youtube.com/watch?v=")
        .replace("?t=", "&t=")
    );

    var vHtml = "";
    var vShare = "?";
    //console.log('changed');
    var videourl1 = "";
    var videourl2 = "";
    var vImg = false;
    var v1 = $("#input1").val();
    vImgAdd = "";
    //console.log(v1);
    //in case of image
    //$('#video-outer-wrap').addClass('split');

    //LOOP THE INPUTS
    $(".videofck-input").each(function (index) {
      var vT = $(this);
      var vVal = vT.val();
      var vVideoId = "video" + index;
      var vTime = "0s";
      if (vVal.indexOf("&t=") >= 0) {
        vTime = vVal.split("&t=")[1];
      }
      if (vVal.indexOf("?t=") >= 0) {
        vTime = vVal.split("?t=")[1];
      }
      //YOUTUBE
      if (vVal.indexOf("youtu") >= 0) {
        if (vVal.indexOf("youtu.be/") >= 0) {
          videourl1 = vVal.split("be/")[1];
        }
        if (vVal.indexOf("v=") >= 0) {
          videourl1 = vVal.split("v=")[1];
          if (videourl1.indexOf("&") >= 0) {
            videourl1 = videourl1.replace("?", "&").split("&")[0];
          }
        }
        videourl1 = videourl1.replace("?", "&");
        console.log(videourl1);
        vShare += "youtube=" + videourl1 + "&t=" + vTime + "&";
        vHtml +=
          '<div class="player playeryoutube" id="player' +
          (index + 1) +
          '"><div class="watermark"></div><div class="video ' +
          vVideoId +
          '" id="' +
          vVideoId +
          '"><iframe allow="autoplay" width="720" height="405" src="https://www.youtube-nocookie.com/embed/' +
          videourl1 +
          "?controls=1&amp;loop=1&playlist=" +
          videourl1 +
          "&mute=1&playsinline=1&autoplay=1&mute=1&start=" +
          vTime.replace("s", "") +
          '" frameborder="0" allow="autoplay; encrypted-media"></iframe></div></div>';
        //WEB IMAGE
      } else if (vVal.indexOf(".png") >= 0 || vVal.indexOf(".jpg") >= 0) {
        vImg = true;
        vShare += "image=" + v1 + "&";
        vHtml +=
          '<div class="player imageplayer" id="player' +
          (index + 1) +
          '" style="background-image:url(' +
          v1 +
          ');"><div class="image" style="background-image:url(' +
          v1 +
          ');"><img src="' +
          v1 +
          '"></div></div>';
        $("#video-outer-wrap").addClass("imgfck");
      } else if (vVal.indexOf(".mp4") >= 0) {
        videourl2 = vVal;
        vShare += "mp4=" + vVal + "&";
        vHtml +=
          '<div class="player playerpornhub" id="player2"><video width="500" class="mp4video" loop autoplay controls><source src="' +
          vVal +
          '" type="video/mp4" /></video></div>';
        $("#video-outer-wrap").addClass("imgfck");
      } else if (vVal.indexOf("pornhub") >= 0) {
        //console.log(vVal);
        //no local? then pornhub
        videourl2 = vVal.split("key=")[1];
        //console.log(videourl2);
        if (vShare.indexOf("pornhub") >= 0) {
          vShare += "pornhub2=" + videourl2 + "&";
        } else {
          vShare += "pornhub=" + videourl2 + "&";
        }
        vHtml +=
          '<div class="player playerpornhub" id="player' +
          (index + 1) +
          '"><div class="video videopornhub ' +
          vVideoId +
          '" id="' +
          vVideoId +
          '"><iframe allow="autoplay" class="" src="https://www.pornhub.com/embed/' +
          videourl2 +
          '" id="ph" frameborder="0"  scrolling="no"></iframe></div></div>';
      } else if ($("#localurl0").val() !== "") {
        vHtml +=
          '<div class="player playerlocal0" id="player1"><video class="video video0 videolocal0" id="video0" width="720" height="405" src="' +
          $("#localurl0").val() +
          '" controls muted loop id="localvideo0"></video></div>';
      } else if ($("#localurl").val() !== "") {
        vHtml +=
          '<div class="player playerlocal1" id="player2"><video class="video video1 videolocal" id="video1" width="720" height="405" src="' +
          $("#localurl").val() +
          '" controls muted loop id="localvideo"></video></div>';
      }

      var vStrobespeed = $("#strobespeed").val();
      var vMode = $("#mode").val();
      var vUrl =
        "https://www.videofck.com/" +
        vShare +
        "strobespeed=" +
        vStrobespeed +
        "&mode=" +
        vMode;
      if (vImg) {
        vUrl =
          "https://www.videofck.com/?image=" +
          encodeURI(v1) +
          "&pornhub=" +
          videourl2;
      }
      $(".video-wrap").html(vHtml);
      if ($(".videolocal").length) {
        $(".playerpornhub").remove();
        $(".videolocal").get(0).play();
      }
      if ($(".videolocal0").length) {
        $(".playeryoutube").remove();
        $(".videolocal0").get(0).play();
      }
      $(".input-wrap").hide();
      $(".share").html(
        'Link to share: <a class="sharelink" href="' +
          vUrl +
          '">' +
          vUrl +
          "</a><br />"
      );

      if (!$("#video-outer-wrap").hasClass("pinp")) {
        $(".combine").show();
      }
      $(".stepper4").show();
      $(".intro").hide();
      $("#fs").on("click", function () {
        $("#video-outer-wrap").fullscreen();
      });

      //MODES======================================================================================================================
      if (vMode == "pinp") {
        $("body").removeClass().addClass("bodypinp");
        $(".red").closest(".stepper").hide();
        docombine();
      }

      $("#blinker").on("click", function () {
        $("body").removeClass().addClass("blinker");
        return false;
      });

      $("#splitit").on("click", function () {
        $("body").removeClass().addClass("split");
        $("#mode").val("split");
        return false;
      });
      $("#overlay").on("click", function () {
        $("body").removeClass().addClass("overlay");
        $("#mode").val("overlay");
        return false;
      });

      $("#sidebysideit").on("click", function () {
        $("body").removeClass().addClass("sidebyside");
        $("#mode").val("sidebyside");
        return false;
      });

      $("#pinp").on("click", function () {
        $("body").removeClass().addClass("bodypinp");
        $("#mode").val("pinp");
        return false;
      });

      $("#new").on("click", function () {
        $(".red").closest(".stepper").show();
        //$('.options').hide();
        //$('.slidercontainer-opacity').hide();
        $(".combine").hide();
        $(".action-bar").find("h3").show();
        //$("#video-outer-wrap").toggleClass("split");
        $(".intro").show();
        $(".stepper").show();
        $(".input-wrap").show();
        return false;
      });

      $(".combine").css("opacity", "1");
    });
  });

  $(".combine").on("click", function () {
    docombine();
    return false;
  });

  function docombine() {
    $(".red").closest(".stepper").hide();
    $(".combine").hide();
    $(".action-bar").find("h3").hide();
    $("html,body").animate({
      scrollTop: $(".video-wrap").offset().top - 120
    });
    $(".intro").hide();
    if (!$("body").hasClass("bodypinp")) {
      $("body").addClass("blinker");
    }
  }

  $("#myRange").on("change", function () {
    var vT = $(this);
    var vVal = vT.val() * 100;
    $("#opacity").val(vVal);
    $("#extrastyles").html(
      "body.blinker #player2{-moz-animation: blink normal " +
        vVal +
        "ms infinite;-webkit-animation: blink normal " +
        vVal +
        "ms infinite;-ms-animation: blink normal " +
        vVal +
        "ms infinite;animation: blink normal " +
        vVal +
        "ms infinite;}"
    );
    //console.log(vVal);
  });
  $("#myRange-opacity").on("change", function () {
    var vT = $(this);
    var vVal = vT.val() / 10;
    $("#strobespeed").val(vVal);
    $("#video-outer-wrap #player2").css("opacity", vVal);
    console.log(vVal);
  });
});

/*
 * jquery.fullscreen v0.6.0
 * https://github.com/private-face/jquery.fullscreen
 *
 * Copyright (c) 2012–2016 Vladimir Zhuravlev
 * Released under the MIT license
 * https://github.com/private-face/jquery.fullscreen/blob/master/LICENSE
 *
 * Date: 2016-08-25
 **/
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["jquery"], function (jQuery) {
      return factory(jQuery);
    });
  } else if (typeof exports === "object") {
    // CommonJS/Browserify
    factory(require("jquery"));
  } else {
    // Global
    factory(global.jQuery);
  }
})(this, function ($) {
  function defined(a) {
    return "undefined" != typeof a;
  }

  function extend(a, b, c) {
    var d = function () {};
    (d.prototype = b.prototype),
      (a.prototype = new d()),
      (a.prototype.constructor = a),
      (b.prototype.constructor = b),
      (a._super = b.prototype),
      c && $.extend(a.prototype, c);
  }

  function native(a, b) {
    var c;
    "string" == typeof a && ((b = a), (a = document));
    for (var d = 0; d < SUBST.length; ++d) {
      b = b.replace(SUBST[d][0], SUBST[d][1]);
      for (var e = 0; e < VENDOR_PREFIXES.length; ++e)
        if (
          ((c = VENDOR_PREFIXES[e]),
          (c += 0 === e ? b : b.charAt(0).toUpperCase() + b.substr(1)),
          defined(a[c]))
        )
          return a[c];
    }
  }
  var SUBST = [
      ["", ""],
      ["exit", "cancel"],
      ["screen", "Screen"]
    ],
    VENDOR_PREFIXES = ["", "o", "ms", "moz", "webkit", "webkitCurrent"],
    ua = navigator.userAgent,
    fsEnabled = native("fullscreenEnabled"),
    parsedChromeUA = ua.match(/Android.*Chrome\/(\d+)\./),
    IS_ANDROID_CHROME = !!parsedChromeUA,
    CHROME_VERSION,
    ANDROID_CHROME_VERSION;
  IS_ANDROID_CHROME && (ANDROID_CHROME_VERSION = parseInt(parsedChromeUA[1]));
  var IS_NATIVELY_SUPPORTED =
      (!IS_ANDROID_CHROME || ANDROID_CHROME_VERSION > 37) &&
      defined(native("fullscreenElement")) &&
      (!defined(fsEnabled) || fsEnabled === !0),
    version = $.fn.jquery.split("."),
    JQ_LT_17 = parseInt(version[0]) < 2 && parseInt(version[1]) < 7,
    FullScreenAbstract = function () {
      (this.__options = null),
        (this._fullScreenElement = null),
        (this.__savedStyles = {});
    };
  FullScreenAbstract.prototype = {
    native: native,
    _DEFAULT_OPTIONS: {
      styles: {
        boxSizing: "border-box",
        MozBoxSizing: "border-box",
        WebkitBoxSizing: "border-box"
      },
      toggleClass: null
    },
    __documentOverflow: "",
    __htmlOverflow: "",
    _preventDocumentScroll: function () {
      (this.__documentOverflow = document.body.style.overflow),
        (this.__htmlOverflow = document.documentElement.style.overflow),
        $(this._fullScreenElement).is("body, html") ||
          $("body, html").css("overflow", "hidden");
    },
    _allowDocumentScroll: function () {
      (document.body.style.overflow = this.__documentOverflow),
        (document.documentElement.style.overflow = this.__htmlOverflow);
    },
    _fullScreenChange: function () {
      this.__options &&
        (this.isFullScreen()
          ? (this._preventDocumentScroll(), this._triggerEvents())
          : (this._allowDocumentScroll(),
            this._revertStyles(),
            this._triggerEvents(),
            (this._fullScreenElement = null)));
    },
    _fullScreenError: function (a) {
      this.__options &&
        (this._revertStyles(),
        (this._fullScreenElement = null),
        a && $(document).trigger("fscreenerror", [a]));
    },
    _triggerEvents: function () {
      $(this._fullScreenElement).trigger(
        this.isFullScreen() ? "fscreenopen" : "fscreenclose"
      ),
        $(document).trigger("fscreenchange", [
          this.isFullScreen(),
          this._fullScreenElement
        ]);
    },
    _saveAndApplyStyles: function () {
      var a = $(this._fullScreenElement);
      this.__savedStyles = {};
      for (var b in this.__options.styles)
        (this.__savedStyles[b] = this._fullScreenElement.style[b]),
          (this._fullScreenElement.style[b] = this.__options.styles[b]);
      a.is("body") &&
        (document.documentElement.style.overflow = this.__options.styles.overflow),
        this.__options.toggleClass && a.addClass(this.__options.toggleClass);
    },
    _revertStyles: function () {
      var a = $(this._fullScreenElement);
      for (var b in this.__options.styles)
        this._fullScreenElement.style[b] = this.__savedStyles[b];
      a.is("body") &&
        (document.documentElement.style.overflow = this.__savedStyles.overflow),
        this.__options.toggleClass && a.removeClass(this.__options.toggleClass);
    },
    open: function (a, b) {
      a !== this._fullScreenElement &&
        (this.isFullScreen() && this.exit(),
        (this._fullScreenElement = a),
        (this.__options = $.extend(!0, {}, this._DEFAULT_OPTIONS, b)),
        this._saveAndApplyStyles());
    },
    exit: null,
    isFullScreen: null,
    isNativelySupported: function () {
      return IS_NATIVELY_SUPPORTED;
    }
  };
  var FullScreenNative = function () {
    FullScreenNative._super.constructor.apply(this, arguments),
      (this.exit = $.proxy(native("exitFullscreen"), document)),
      (this._DEFAULT_OPTIONS = $.extend(!0, {}, this._DEFAULT_OPTIONS, {
        styles: {
          width: "100%",
          height: "100%"
        }
      })),
      $(document)
        .bind(
          this._prefixedString("fullscreenchange") + " MSFullscreenChange",
          $.proxy(this._fullScreenChange, this)
        )
        .bind(
          this._prefixedString("fullscreenerror") + " MSFullscreenError",
          $.proxy(this._fullScreenError, this)
        );
  };
  extend(FullScreenNative, FullScreenAbstract, {
    VENDOR_PREFIXES: ["", "o", "moz", "webkit"],
    _prefixedString: function (a) {
      return $.map(this.VENDOR_PREFIXES, function (b) {
        return b + a;
      }).join(" ");
    },
    open: function (a, b) {
      FullScreenNative._super.open.apply(this, arguments);
      var c = native(a, "requestFullscreen");
      c.call(a);
    },
    exit: $.noop,
    isFullScreen: function () {
      return null !== native("fullscreenElement");
    },
    element: function () {
      return native("fullscreenElement");
    }
  });
  var FullScreenFallback = function () {
    FullScreenFallback._super.constructor.apply(this, arguments),
      (this._DEFAULT_OPTIONS = $.extend({}, this._DEFAULT_OPTIONS, {
        styles: {
          position: "fixed",
          zIndex: "2147483647",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0
        }
      })),
      this.__delegateKeydownHandler();
  };
  extend(FullScreenFallback, FullScreenAbstract, {
    __isFullScreen: !1,
    __delegateKeydownHandler: function () {
      var a = $(document);
      a.delegate(
        "*",
        "keydown.fullscreen",
        $.proxy(this.__keydownHandler, this)
      );
      var b = JQ_LT_17 ? a.data("events") : $._data(document).events,
        c = b.keydown;
      JQ_LT_17
        ? b.live.unshift(b.live.pop())
        : c.splice(0, 0, c.splice(c.delegateCount - 1, 1)[0]);
    },
    __keydownHandler: function (a) {
      return !this.isFullScreen() || 27 !== a.which || (this.exit(), !1);
    },
    _revertStyles: function () {
      FullScreenFallback._super._revertStyles.apply(this, arguments),
        this._fullScreenElement.offsetHeight;
    },
    open: function (a) {
      FullScreenFallback._super.open.apply(this, arguments),
        (this.__isFullScreen = !0),
        this._fullScreenChange();
    },
    exit: function () {
      this.__isFullScreen &&
        ((this.__isFullScreen = !1), this._fullScreenChange());
    },
    isFullScreen: function () {
      return this.__isFullScreen;
    },
    element: function () {
      return this.__isFullScreen ? this._fullScreenElement : null;
    }
  }),
    ($.fullscreen = IS_NATIVELY_SUPPORTED
      ? new FullScreenNative()
      : new FullScreenFallback()),
    ($.fn.fullscreen = function (a) {
      var b = this[0];
      return (
        (a = $.extend(
          {
            toggleClass: null,
            overflow: "hidden"
          },
          a
        )),
        (a.styles = {
          overflow: a.overflow
        }),
        delete a.overflow,
        b && $.fullscreen.open(b, a),
        this
      );
    });
  //# sourceMappingURL=jquery.fullscreen.min.js.mapreturn $.fullscreen;
});
