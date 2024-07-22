// Name: Monodeath's Toolbox
// ID: Monodeath
// Description: Adds various blocks I made :)
// By: Monodeath <https://scratch.mit.edu/users/BekfastKingRyan/>
// License: MIT

((Scratch) => {
    "use strict";

    const cast = Scratch.Cast;

    class Monodeath {
        getInfo() {
            return {
                id: "Monodeath",
                name: "Monodeath's Toolbox",

                color1: "#d8a2f2",

                blocks: [{
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
                    {
                        opcode: 'setJSONPathToValue',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Set value of [PATH] in [JSON_STRING] to [VALUE]',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'fruit/apples',
                            },
                            JSON_STRING: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"fruit": {"apples": 2, "bananas": 3}}',
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '5',
                            },
                        },
                    },
                    {
                        opcode: 'findEmptyPath',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[SORT] empty path in [PATH] of [JSON_STRING]',
                        arguments: {
                            SORT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'first',
                            },
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'fruit',
                            },
                            JSON_STRING: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"fruit": {"apples": {}, "bananas": {}}}',
                            },
                        },
                    },
                    {
                        opcode: 'ValueAsString',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[VALUE] as string',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'true',
                            },
                        },
                    },
                    {
                        opcode: 'ValueBetweenTexts',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[TEXT1][VALUE][TEXT2]',
                        arguments: {
                            TEXT1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello',
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'world',
                            },
                            TEXT2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '!',
                            },
                        },
                    },
                    {
                        opcode: 'ValueAsStringNoNewline',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[VALUE] as string without newlines',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'true',
                            },
                        },
                    },
                    {
                        opcode: 'ValueNoQuotes',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '[VALUE] without quotes',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'true',
                            },
                        },
                    },
                ],
            };
        }

        customcomparator({
            A,
            B,
            C
        }) {
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

        customcomparator2({
            A,
            B,
            C
        }) {
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

        setJSONPathToValue({
            PATH,
            JSON_STRING,
            VALUE
        }) {
            try {
                const path = PATH.toString().split('/').map(decodeURIComponent);
                let json;
                try {
                    json = JSON.parse(JSON_STRING);
                } catch (e) {
                    return e.message;
                }
                let obj = json;
                for (let i = 0; i < path.length - 1; i++) {
                    if (!(path[i] in obj)) obj[path[i]] = {};
                    obj = obj[path[i]];
                }
                
                // Determine the correct type for VALUE based on its content
                try {
                    obj[path[path.length - 1]] = JSON.parse(VALUE);
                } catch (e) {
                    obj[path[path.length - 1]] = VALUE;
                }

                return JSON.stringify(json);
            } catch (err) {
                return '';
            }
        }
        findEmptyPath({ SORT, PATH, JSON_STRING }) {
            try {
                const path = PATH.toString().split('/').map(decodeURIComponent);
                let json;
                try {
                    json = JSON.parse(JSON_STRING);
                } catch (e) {
                    return e.message;
                }
                
                let obj = json;
                for (let i = 0; i < path.length; i++) {
                    if (!(path[i] in obj)) return 'None';
                    obj = obj[path[i]];
                }

                const emptyKeys = Object.keys(obj).filter(key => {
                    return typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0;
                });

                if (emptyKeys.length === 0) {
                    return 'None';
                }

                if (SORT === 'first') {
                    return emptyKeys[0];
                } else if (SORT === 'last') {
                    return emptyKeys[emptyKeys.length - 1];
                } else {
                    return 'None';
                }
            } catch (err) {
                return 'None';
            }
        }
        ValueAsString({ VALUE }) {
            return VALUE.toString();
        }
        ValueBetweenTexts({ TEXT1, VALUE, TEXT2 }) {
            return `${TEXT1}${VALUE}${TEXT2}`;
        }
        ValueAsStringNoNewline({ VALUE }) {
            return VALUE.replace(/\r?\n|\r/g, ' ').toString();
        }
        ValueNoQuotes({ VALUE }) {
            // Remove any surrounding quotes from the VALUE
            return VALUE.replace(/^"|"$/g, '');
        }
    }

    Scratch.extensions.register(new Monodeath());
})(Scratch);
