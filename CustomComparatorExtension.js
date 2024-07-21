// Name: Custom Comparator
// ID: Monodeath
// Description: A simple block that allows you to use a custom value for an operator.
// By: Monodeath <https://scratch.mit.edu/users/BekfastKingRyan/>
// License: MIT

((Scratch) => {
  "use strict";

  const cast = Scratch.Cast;

  class ScratchMath {
    getInfo() {
      return {
        id: "Monodeath",
        name: "Custom Comparator",

        color1: "#59c059",

        blocks: [
          {
            opcode: "customcomparator",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] [B] [C]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 50,
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ">",
              },
              C: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: "customcomparator2",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] [B] [C]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: true,
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "and",
              },
              C: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: false,
              },
            },
          },
        ],
      };
    }

    customcomparator({ A, B, C }) {
      A = cast.toNumber(A);
      C = cast.toNumber(C);
      switch (B) {
        case ">":
          return A > C;
        case "<":
          return A < C;
        case "=":
        case "==":
          return A == C;
        case ">=":
          return A >= C;
        case "<=":
          return A <= C;
        case "!=":
          return A != C;
        default:
          return false;
      }
    }

    customcomparator2({ A, B, C }) {
      A = cast.toBoolean(A);
      C = cast.toBoolean(C);
      switch (B) {
        case "and":
          return A && C;
        case "or":
          return A || C;
        case "xor":
          return A !== C;
        case "nand":
          return !(A && C);
        case "nor":
          return !(A || C);
        case "xnor":
          return A === C;
        default:
          return false;
      }
    }
  }

  Scratch.extensions.register(new ScratchMath());
})(Scratch);
