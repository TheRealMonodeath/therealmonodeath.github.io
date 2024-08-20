// Name: Monodeath's Toolbox
// ID: monodeathToolbox
// Description: More conditional and loop statements.
// License: LGPL-3.0

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;

  class MoreControl {

    getInfo() {
      return {
        id: "monodeathToolbox",
        name: "Mono's Toolbox",
        color1: "#661f69",
        color2: "#4b2254",
        color3: "#33223d",
        blocks: [
          {
            opcode: "test",
            blockType: Scratch.BlockType.LOOP,
            text: "repeat [DURATION] or until [CONDITION]",
            branchCount: 1,
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              },
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false,
              },
            },
          },
        ],
      };
    }

    test(args, util) {
  if (util.stackTimerNeedsInit()) {
    const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));
    util.startStackTimer(duration);
    runtime.requestRedraw();
    return true;
  } else if (!util.stackTimerFinished() && !args.CONDITION) {
    return true;
  }
  return false;
}

  Scratch.extensions.register(new MoreControl());
})(Scratch);
