/* PLANWORK
 * @author Matt Owen + PLANWORK
 * @date 12/04/03
 * Last song: 
 */

// window.addEventListener("load", sizeUp);
// window.addEventListener("resize", sizeUp);

/* Correctly size up the PLANWORK logo
 *
 * Makes the PLANWORK logo fit the complete dimensions of the screen.
 * @return undefined
 * @author Matt Owen matt@planwork.us
 */
function sizeUp2 () {
  // ...
  var pwpw = document.getElementById("PWPW"),
      plan = document.getElementById("PLAN"),
      work = document.getElementById("WORK"),
      teaser = document.getElementById("tote-teaser"),

      vp = utils.getViewport(),
      screen_size = utils.getScreenResolution(),

      pw
      ;

  pwpw.style.width = work.offsetWidth + "px";
  pwpw.style.padding = ".05em .15em .05em .15em";
  pwpw.style.padding = "0";

  pw = utils.getPosition(pwpw);

  var scale;

  // If it's the usual wide type of screen, fit to 
  if (pw.ratio < vp.ratio) {
    scale = vp.height/pw.height;
  }
  // Fit to width
  else {
    scale = vp.height/pw.width;
    pwpw.className = "rotated";
    teaser.className = "rotated";
  }


  var scale_text = Math.floor(scale * 100) + "%";

  // SAVE FOR LATER
  pwpw.style.fontSize = scale_text;
  pwpw.style.borderWidth = Math.floor(scale) + "px";
  pwpw.style.width = work.offsetWidth + "px";
  pwpw.style.height = 2 * work.offsetHeight + "px";
  
  // Adjust the letter spacing in PLANWORK logo
  adjustPlanKerning();

  // Center the planwork logo
  utils.centerAt(pwpw);

  // Center background image
  utils.centerAt(teaser);
}

/* Resize PLAN element in logo
 */
function adjustPlanKerning () {
  // Get PLAN and WORK elements and compute the difference in width, divided by
  // the 3 (the number of spaces between characters in "PLAN")
  var plan = document.getElementById("PLAN"),
      work = document.getElementById("WORK"),
      diff_width = Math.round((work.offsetWidth - plan.offsetWidth)/3)
      ;

  // Apply the CSS
  plan.style.letterSpacing = diff_width + "px";
}



var utils = {
  /* Get Viewport Size
   * Get the dimensions of the viewport. Simple.
   * @return an object with the properties "width" and "height" set to the 
   * viewport dimensions in pixels.
   */
  getViewport : function () {
    //
    var e = window, a = 'inner';

    if ( !( 'innerWidth' in window ) ) {
      a = 'client';
      e = document.documentElement || document.body;
    }

    // Create object with just height and width
    var vp = { width : e[ a+'Width' ] , height : e[ a+'Height' ] };

    // Set ratio for ease
    vp.ratio = vp.width/vp.height;

    // Set center for ease
    vp.center =  { x : Math.floor(vp.width/2), y : Math.floor(vp.height/2) };
    return vp;
  },


  /* Get Screen Size
   * Get the dimensions of the screen. Simple.
   * @return an object with the properties "width" and "height" set to the 
   * viewport dimensions in pixels.
   */
  getScreenResolution : function () {
    return {
      width : screen.width,
      height : screen.height,
      ratio : screen.width / screen.height
    };
  },

  /* Get Position
   *
   * Return the x-y coordinate of the HTML Element object as an object. Values 
   * are stored in the 'x' and 'y' properties respectively.
   * @param obj a HTML Element object
   * @return an object with the 'x' and 'y' properties set, specifying distance
   * from the left and top borders of the screen respectively
   * */
  getPosition : function (obj, opts) {
    /* Get x-y position */
    var get_pos = function (obj) {
      var left = 0, top = 0;

      if (obj.offsetParent) {
        do {
          left += obj.offsetLeft;
          top  += obj.offsetTop;
        } while (obj = obj.offsetParent);
      }

      return { x : left, y : top };
    };
    
    var pos = {
      width : $(obj).outerWidth(),
      height : $(obj).outerHeight()
    };

    var o = $(obj);

    pos.ratio = pos.width / pos.height;

    pos.center = {
      x : Math.round((2*pos.x + pos.width)/2),
      y : Math.round((2*pos.y + pos.height)/2)
    };
    
    return pos;
  },

  /* Center object at the specified position
   * @param object the object to position
   * @param x the new centered x-coordinate of the object
   * @param y the new centered y-coordinate of the object
   * @return undefined
   */
  centerAt : function (object, x, y) {

    var vp = utils.getViewport(),
        pos = utils.getPosition(object)
        ;

    if (object.style && object.style.position != "fixed")
      object.style.position = "absolute";

    object.style.left = vp.center.x - Math.floor(pos.width/2) + "px";
    object.style.top = vp.center.y - Math.floor(pos.height/2) + "px";
  }
};

