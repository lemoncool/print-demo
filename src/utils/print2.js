/* @Print.js
 * DH (http://denghao.me)
 * 2017-7-14
 */
(function (window, document) {
  let Print = function (dom, options) {
    if (!(this instanceof Print)) return new Print(dom, options);

    this.options = this.extend({
      noPrint: '.no-print',
      onStart: function () {
      },
      onEnd: function () {
      }
    }, options);

    if ((typeof dom) === "string") {
      this.dom = document.querySelector(dom);
    } else {
      this.dom = dom;
    }

    this.init();
  };
  Print.prototype = {
    init: function () {
      let content = this.getStyle() + this.getHtml();
      this.writeIframe(content);
    },
    extend: function (obj, obj2) {
      for (let k in obj2) {
        obj[k] = obj2[k];
      }
      return obj;
    },

    getStyle: function () {
      let str = "",
        styles = document.querySelectorAll('style,link');
      for (let i = 0; i < styles.length; i++) {
        str += styles[i].outerHTML;
      }
      str += "<style>" + (this.options.noPrint ? this.options.noPrint : '.no-print') + "{display:none;}</style>";

      return str;
    },

    getHtml: function () {
      let inputs = document.querySelectorAll('input');
      let textareas = document.querySelectorAll('textarea');
      let selects = document.querySelectorAll('select');

      for (let k in inputs) {
        if (inputs[k].type == "checkbox" || inputs[k].type == "radio") {
          if (inputs[k].checked == true) {
            inputs[k].setAttribute('checked', "checked")
          } else {
            inputs[k].removeAttribute('checked')
          }
        } else if (inputs[k].type == "text") {
          inputs[k].setAttribute('value', inputs[k].value)
        }
      }

      for (let k2 in textareas) {
        if (textareas[k2].type == 'textarea') {
          textareas[k2].innerHTML = textareas[k2].value
        }
      }

      for (let k3 in selects) {
        if (selects[k3].type == 'select-one') {
          let child = selects[k3].children;
          for (let i in child) {
            if (child[i].tagName == 'OPTION') {
              if (child[i].selected == true) {
                child[i].setAttribute('selected', "selected")
              } else {
                child[i].removeAttribute('selected')
              }
            }
          }
        }
      }

      return this.dom.outerHTML;
    },

    writeIframe: function (content) {
      let w, doc, iframe = document.createElement('iframe'),
        f = document.body.appendChild(iframe);
      iframe.id = "myIframe";
      iframe.style = "position:absolute;width:0;height:0;top:-10px;left:-10px;";

      w = f.contentWindow || f.contentDocument;
      doc = f.contentDocument || f.contentWindow.document;
      doc.open();
      doc.write(content);
      doc.close();
      this.toPrint(w, function () {
        document.body.removeChild(iframe)
      });
    },

    toPrint: function (w, cb) {
      let _this = this;
      w.onload = function () {
        try {
          setTimeout(function () {
            w.focus();
            typeof _this.options.onStart === 'function' && _this.options.onStart();
            if (!w.document.execCommand('print', false, null)) {
              w.print();
            }
            typeof _this.options.onEnd === 'function' && _this.options.onEnd();
            w.close();
            cb && cb()
          });
        } catch (err) {
          console.log('err', err);
        }
      }
    }
  };
  window.Print = Print;
}(window, document));
