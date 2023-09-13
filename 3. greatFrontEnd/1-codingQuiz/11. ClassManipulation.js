class Jquery {
  constructor(selector) {
    this.selector = selector;
    this.element = document.querySelector(selector);
  }

  setClassName(className) {
    return new Set(className.trim().split(/\s+/));
  }

  toggleClass(className, state) {
    if (this.element == null) return undefined;

    const classes = this.setClassName(className);
    const elementClasses = this.setClassName(this.element.className);

    classes.forEach((name) => {
      let shouldRemove =
        state === undefined ? elementClasses.has(name) : !state;
      shouldRemove ? elementClasses.delete(name) : elementClasses.add(name);
    });
    this.element.className = [...elementClasses].join(" ");
    return this;
  }

  addClass(className) {
    this.toggleClass(className, true);
    return this;
  }
  removeClass(className) {
    this.toggleClass(className, false);
    return this;
  }
}

export default function $(selector) {
  return new Jquery(selector);
}

// 다른 풀이

/**
 * @param {string} className
 * @return {Set<string>}
 */
function classNameTokenSet(className) {
  return new Set(className.trim().split(/\s+/));
}

/**
 * @param {string} selector
 * @return {{toggleClass: Function, addClass: Function, removeClass: Function}}
 */
export default function $(selector) {
  const element = document.querySelector(selector);

  return {
    /**
     * @param {string} className
     * @param {boolean} state
     * @return {Object|void}
     */
    toggleClass: function (className, state) {
      // No-op if there is no matching element.
      if (element == null) {
        return undefined;
      }

      const classes = classNameTokenSet(className);
      const elementClasses = classNameTokenSet(element.className);

      classes.forEach((cls) => {
        const shouldRemove =
          state === undefined ? elementClasses.has(cls) : !state;
        shouldRemove
          ? elementClasses.delete(cls) // Remove if state is not defined and element contains the class or state is false.
          : elementClasses.add(cls);
      });

      element.className = Array.from(elementClasses).join(' ');
      return this;
    },
    /**
     * @param {string} className
     * @return {Object}
     */
    addClass: function (className) {
      this.toggleClass(className, true);
      return this;
    },
    /**
     * @param {string} className
     * @return {Object}
     */
    removeClass: function (className) {
      this.toggleClass(className, false);
      return this;
    },
  };
}
