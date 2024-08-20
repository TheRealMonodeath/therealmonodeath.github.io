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
            text: "repeat [DURATION] [TYPE] or until [CONDITION]",
            branchCount: 1,
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
              },
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false,
              },
            },
          },
        ],
        menus: {
          types: {
            acceptReporters: true,
            items: [
              {
                text: "seconds",
                value: "seconds",
              },
              {
                text: "frames",
                value: "frames",
              },
            ],
          },
        },
      };
    }

    test(args, util) {
      const type = Cast.toString(args.TYPE);
      if (type === "frames") {
        const duration = Math.round(Cast.toNumber(args.DURATION));
        if (typeof util.stackFrame.loopCounter === "undefined") {
          util.stackFrame.loopCounter = duration;
        }
        util.stackFrame.loopCounter--;
        if (util.stackFrame.loopCounter >= 0 && !args.CONDITION) {
          return true;
        }
      } else if (type === "seconds") {
        if (util.stackTimerNeedsInit()) {
          const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));
          util.startStackTimer(duration);
          runtime.requestRedraw();
          return true;
        } else if (!util.stackTimerFinished() && !args.CONDITION) {
          return true;
        }
      }
      return false;
    }
  }

  Scratch.extensions.register(new MoreControl());
})(Scratch);
