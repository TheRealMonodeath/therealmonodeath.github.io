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
                    {
                        opcode: 'RemovePattern',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'remove [PATTERN] letter(s) from [VALUE]',
                        arguments: {
                            PATTERN: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'patternMenu',
                                defaultValue: 'first',
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'example',
                            },
                        },
                    },
                    {
                        opcode: 'EmptyPathIndex',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'empty paths in [PATH] of [JSON_STRING]',
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'fruit',
                            },
                            JSON_STRING: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"fruit": {"apples": {}, "bananas": {"example": "cool!"}}}',
                            },
                        },
                    },
                ],

                menus: {
                    patternMenu: {
                        items: [
                            'first', 'last', 'first and last', 
                            'odd', 'even', 'first half', 'second half', 
                            'first third', 'second third', 'third third', 
                            'alternating groups of 2', 'inversed alternating groups of 2', 'alternating groups of 3',
                            'inversed alternating groups of 3', 'first and last third', 'first of second half', 'last of first half', 'first of second third',
                            'last of second third', 'all characters matching first letter',
                            'all characters matching last letter', 'all matching first and last', 'matching first half', 'matching second half',
                            'character after all characters matching first character', 'letters', 'numbers', 'special characters', 
                            'brackets', 'slashes', 'operators', 'spaces', 'spaces and newlines', 'capital letters',
                            'lowercase letters', 'end punctuation', 'superscript',
                            'alphanumeric', 'hyphens', 'underscores', 'vowels', 'vowels (y included)', 'consonants', 
                            'apostrophes', 'vertical bars', 'ampersands', 
                            'hashtags', 'currency symbols', 'true', 'false', 'quotation', 'markdown', 'uncommon'
                        ]
                    }
                }
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
                case "":
                    return A;
                case "pass":
                    return C;
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
        RemovePattern({ PATTERN, VALUE }) {
            const len = VALUE.length;
            switch (PATTERN) {
                case 'first':
                    return VALUE.substring(1);
                case 'last':
                    return VALUE.substring(0, len - 1);
                case 'first and last':
                    return VALUE.substring(1, len - 1);
                case 'odd':
                    return VALUE.split('').filter((_, i) => i % 2 === 1).join('');
                case 'even':
                    return VALUE.split('').filter((_, i) => i % 2 === 0).join('');
                case 'first half':
                    return VALUE.substring(Math.floor(len / 2));
                case 'second half':
                    return VALUE.substring(0, Math.ceil(len / 2));
                case 'first third':
                    return VALUE.substring(Math.floor(len / 3));
                case 'second third':
                    return VALUE.substring(0, Math.floor(len / 3)) + VALUE.substring(Math.ceil(2 * len / 3));
                case 'third third':
                    return VALUE.substring(0, Math.ceil(2 * len / 3));
                case 'alternating groups of 2':
                    return VALUE.split('').filter((_, i) => Math.floor(i / 2) % 2 === 0).join('');
                case 'inversed alternating groups of 2':
                    return VALUE.split('').filter((_, i) => Math.floor(i / 2) % 2 !== 0).join
                case 'alternating groups of 3':
                    return VALUE.split('').filter((_, i) => Math.floor(i / 3) % 2 === 0).join('');
                case 'inversed alternating groups of 3':
                    return VALUE.split('').filter((_, i) => Math.floor(i / 3) % 2 === 1).join('');
                case 'first and last third':
                    return VALUE.substring(Math.floor(VALUE.length / 3), Math.ceil(2 * VALUE.length / 3));
                case 'first of second half':
                    return VALUE.substring(Math.ceil(VALUE.length / 2), Math.ceil(VALUE.length / 2) + 1);
                case 'last of first half':
                    return VALUE.substring(Math.floor(VALUE.length / 2) - 1, Math.floor(VALUE.length / 2));
                case 'first of second third':
                    return VALUE.substring(Math.floor(VALUE.length / 3), Math.floor(VALUE.length / 3) + 1);
                case 'last of second third':
                    return VALUE.substring(Math.floor(2 * VALUE.length / 3) - 1, Math.floor(2 * VALUE.length / 3));
                case 'all characters matching first letter':
                    return VALUE.split(VALUE[0]).join('');
                case 'all characters matching last letter':
                    return VALUE.split(VALUE[VALUE.length - 1]).join('');
                case 'all matching first and last':
                    return VALUE.split('').filter(ch => ch !== VALUE.charAt(0) && ch !== VALUE.charAt(VALUE.length - 1)).join('');
                case 'matching first half':
                    return VALUE.split('').filter(ch => !VALUE.substring(0, Math.floor(VALUE.length / 2)).includes(ch)).join('');
                case 'matching second half':
                    return VALUE.split('').filter(ch => !VALUE.substring(Math.ceil(VALUE.length / 2)).includes(ch)).join('');
                case 'character after all characters matching first character':
                    return VALUE.split('').filter((ch, i) => !(i > 0 && VALUE.charAt(i - 1) === VALUE.charAt(0))).join('');
                case 'letters':
                    return VALUE.replace(/[a-zA-Z]/g, '');
                case 'numbers':
                    return VALUE.replace(/[0-9]/g, '');
                case 'special characters':
                    return VALUE.replace(/[^a-zA-Z0-9\s]/g, '');
                case 'brackets':
                    return VALUE.replace(/[\[\]\(\)\{\}]/g, '');
                case 'slashes':
                    return VALUE.replace(/[\/\\]/g, '');
                case 'operators':
                    return VALUE.replace(/[\+\-\>\<\=\*]/g, '');
                case 'spaces':
                    return VALUE.replace(/ /g, '');
                case 'spaces and newlines':
                    return VALUE.replace(/[\s\n]/g, '');
                case 'capital letters':
                    return VALUE.replace(/[A-Z]/g, '');
                case 'lowercase letters':
                    return VALUE.replace(/[a-z]/g, '');
                case 'end punctuation':
                    return VALUE.replace(/[.!?…]/g, '');
                case 'superscript':
                    return VALUE.replace(/\^/g, '');
                case 'alphanumeric':
                    return VALUE.replace(/[a-zA-Z0-9]/g, '');
                case 'hyphens':
                    return VALUE.replace(/-/g, '');
                case 'underscores':
                    return VALUE.replace(/_/g, '');
                case 'vowels':
                    return VALUE.replace(/[aeiouAEIOU]/g, '');
                case 'vowels (y included)':
                    return VALUE.replace(/[aeiouyAEIOUY]/g, '');
                case 'consonants':
                    return VALUE.replace(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g, '');
                case 'apostrophes':
                    return VALUE.replace(/['’]/g, '');
                case 'vertical bars':
                    return VALUE.replace(/\|/g, '');
                case 'ampersands':
                    return VALUE.replace(/&/g, '');
                case 'hashtags':
                    return VALUE.replace(/#/g, '');
                case 'currency symbols':
                    return VALUE.replace(/[\$\£\¥\₱\€\¢\₩\₼\៛]/g, '');
                case 'true':
                    return VALUE.replace(/true/g, '');
                case 'false':
                    return VALUE.replace(/false/g, '');
                case 'quotation':
                    return VALUE.replace(/["']/g, '');
                case 'markdown':
                    return VALUE.replace(/[*_~^#@]/g, '');
                case 'uncommon':
                    return VALUE.replace(/[zxyjq]/g, '');
                default:
                    return VALUE;
            }
        }
        EmptyPathIndex({ PATH, JSON_STRING }) {
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

                return emptyKeys.join(',');

            } catch (err) {
                return 'None';
            }
        }
    }

    Scratch.extensions.register(new Monodeath());
})(Scratch);
