const parse = require('kelp-argv');

const program = options => {
  const interface = {
    command(name, fn) {
      this.commands = this.commands || {};
      this.commands[name] = fn;
      return this;
    },
    exec(name = 'help') {
      const fn = this.commands[name];
      if (typeof fn !== 'function') {
        throw new TypeError(`command "${name}" not found`);
      }
      return fn.apply(this, [].slice.call(arguments, 1));
    },
    parse(argv) {
      const args = parse(argv);
      const name = args._.shift();
      return this.exec(name, args);
    }
  };
  return interface;
};

module.exports = program;