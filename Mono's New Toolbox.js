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
        {
          opcode: "modifyArray",
          blockType: Scratch.BlockType.REPORTER,
          text: "[OPERATION] [VALUE] to [ARRAY]",
          arguments: {
            OPERATION: {
              type: Scratch.ArgumentType.STRING,
              menu: "operationMenu",
              defaultValue: "add",
            },
            VALUE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1,
            },
            ARRAY: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: '["1", "2", "3"]',
            },
          },
        },
      ],
      menus: {
        operationMenu: {
          acceptReporters: true,
          items: ["add", "subtract", "multiply", "divide"],
        },
      },
    };
  }

  RepeatOrUntil(args, util) {
    if (util.stackTimerNeedsInit()) {
      const duration = Math.max(0, 1000 * Number(args.DURATION));
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

  modifyArray({ OPERATION, VALUE, ARRAY }) {
    const parsedArray = JSON.parse(ARRAY);
    const value = parseFloat(VALUE);

    const resultArray = parsedArray.map(item => {
      const num = parseFloat(item);
      if (isNaN(num)) {
        return item;
      }
      switch (OPERATION) {
        case "add":
          return (num + value).toString();
        case "subtract":
          return (num - value).toString();
        case "multiply":
          return (num * value).toString();
        case "divide":
          return (num / value).toString();
        default:
          return num.toString();
      }
    });

    return JSON.stringify(resultArray); 
  }
}

Scratch.extensions.register(new Monodeath());
