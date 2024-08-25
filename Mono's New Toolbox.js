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
        color1: "#1f152e",
        color2: "#1f1126",
        color3: "#1d0c21",
        blocks: [
          {
            opcode: "RepeatOrUntil",
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
          {
            opcode: "ifAndHasBeen",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "If [CONDITION] and has been [SECONDS] seconds since last ran",
            branchCount: 1,
            arguments: {
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: true,
              },
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
        ],
      };
    }

    RepeatOrUntil(args, util) {
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

  ifAndHasBeen({ CONDITION, SECONDS }, util) {
      // Generate a unique key for each block instance
      const blockId = `${util.target.id}_${util.thread.topBlock}`;

      // Get the current time in milliseconds
      const currentTime = Date.now();

      // Get the last run time for this block, or default to 0
      const lastRunTime = lastRunTimes[blockId] || 0;

      // Calculate the time passed since the last run, in seconds
      const timePassed = (currentTime - lastRunTime) / 1000;

      // Check if the condition is true and the required time has passed
      if (CONDITION && timePassed >= SECONDS) {
        // Update the last run time to the current time
        lastRunTimes[blockId] = currentTime;
        return true; // Allow the nested blocks to run
      }

      return false; // Skip the nested blocks
    }
  }

  Scratch.extensions.register(new MoreControl());
})(Scratch);
