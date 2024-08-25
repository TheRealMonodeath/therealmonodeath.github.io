class Monodeath {
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
          text: "repeat [DURATION] seconds or until [CONDITION]",
          branchCount: 1,
          arguments: {
            DURATION: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1,
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
      const duration = Math.max(0, 1000 * Number(args.DURATION)); // Convert DURATION to a number
      util.startStackTimer(duration);
      return true;
    } else if (!util.stackTimerFinished() && !args.CONDITION) {
      return true;
    }
    return false;
  }

  ifAndHasBeen(args, util) {
    const { CONDITION, SECONDS } = args;

    if (!util.lastRunTimes) {
      util.lastRunTimes = {};
    }

    const blockId = `${util.target.id}_${util.thread.topBlock}`;
    const currentTime = Date.now();
    const lastRunTime = util.lastRunTimes[blockId] || 0;
    const timePassed = (currentTime - lastRunTime) / 1000;

    if (CONDITION && timePassed >= SECONDS) {
      util.lastRunTimes[blockId] = currentTime;
      return true;
    }

    return false;
  }
}

Scratch.extensions.register(new Monodeath());
