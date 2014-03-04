define([ "../mixin/decorator" ], function AfterDecoratorModule(Decorator) {

	var UNDEFINED;
	var VALUE = "value";

	/**
	 * Create a decorator method that is to add code that will be executed after the original method.
	 *
	 * @class composer.decorator.after
	 * @param {Function} func The decorator function which receives the arguments of the original, it's return value (if
	 * not undefined) will be the used as the new return value.
	 * @returns {composer.mixin.decorator}
	 */
	return function after(func) {
		return new Decorator(function(descriptor) {
			var previous = descriptor[VALUE];

			descriptor[VALUE] = previous
				? function() {
					var me = this;
					var retval = previous.apply(me, arguments);
					var newRet = func.apply(me, arguments);
					return newRet !== UNDEFINED ? newRet : retval;
				}
				: func;

			return descriptor;
		});
	}
});
