// Name: Monodeath's Toolbox
// ID: Monodeath
// Description: Adds various blocks I made :)
// By: Monodeath <https://scratch.mit.edu/users/BekfastKingRyan/>
// License: MIT

((Scratch) => {
    "use strict";

    const cast = Scratch.Cast;

    class ScratchMath {
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
                        opcode: 'setJSONPathToValueNF',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Set value of [PATH] in [JSON_STRING] to [VALUE] without unnecessary JSON formatting',
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
                                defaultValue: 'test',
                            },
                        },
                    },
                    {
                        opcode: 'validateJSON',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'validated [JSON_STRING]',
                        arguments: {
                            JSON_STRING: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"fruit": {"apples": 2, bananas: 3}}',
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
                obj[path[path.length - 1]] = VALUE;
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
        setJSONPathToValueNF({ PATH, JSON_STRING, VALUE }) {
            try {
                const path = PATH.split('/').map(decodeURIComponent);
                let json;
                try {
                    json = JSON.parse(JSON_STRING);
                } catch (e) {
                    return `Error parsing JSON: ${e.message}`;
                }
                let obj = json;
                for (let i = 0; i < path.length - 1; i++) {
                    if (!(path[i] in obj)) obj[path[i]] = {};
                    obj = obj[path[i]];
                }
                // Set the value directly without quoting it
                obj[path[path.length - 1]] = VALUE;

                // Convert the updated JSON object to a plain text string
                function objToPlainText(obj) {
                    if (typeof obj === 'object' && obj !== null) {
                        let str = '{';
                        const keys = Object.keys(obj);
                        for (let i = 0; i < keys.length; i++) {
                            const key = keys[i];
                            const value = obj[key];
                            str += `"${key}": ${typeof value === 'object' ? objToPlainText(value) : value}`;
                            if (i < keys.length - 1) str += ', ';
                        }
                        str += '}';
                        return str;
                    } else {
                        return typeof obj === 'string' ? obj : String(obj);
                    }
                }

                return objToPlainText(json);
            } catch (err) {
                return `Error: ${err.message}`;
            }
        }
        validateJSON({
            JSON_STRING
        }) {
            try {
                const quotedJSON = this.quoteUnquotedValues(JSON_STRING);
                return `${quotedJSON}`;
            } catch (e) {
                return `Error: ${e.message}`;
            }
        }

        // Function to quote unquoted keys and values in the JSON string while preserving formatting
        quoteUnquotedValues(jsonString) {
            let result = '';
            let insideString = false;
            let i = 0;

            while (i < jsonString.length) {
                let char = jsonString[i];

                // Toggle the insideString flag if we encounter a quote
                if (char === '"' || char === "'") {
                    insideString = !insideString;
                }

                // Add quotes around unquoted keys and values
                if (!insideString && char.match(/[a-zA-Z_]/)) {
                    let value = char;
                    i++;
                    while (i < jsonString.length && jsonString[i].match(/\w/)) {
                        value += jsonString[i];
                        i++;
                    }
                    if (jsonString[i] === ':' || jsonString[i] === ',' || jsonString[i] === '}' || jsonString[i] === ']') {
                        result += `"${value}"${jsonString[i]}`;
                    } else {
                        result += value;
                        continue;
                    }
                } else {
                    // Handle booleans and null
                    if (!insideString && (char === 't' || char === 'f' || char === 'n')) {
                        let value = char;
                        i++;
                        while (i < jsonString.length && jsonString[i].match(/[a-z]/)) {
                            value += jsonString[i];
                            i++;
                        }
                        if (['true', 'false', 'null'].includes(value)) {
                            result += `"${value}"`;
                            continue;
                        } else {
                            result += value;
                            continue;
                        }
                    } else {
                        result += char;
                    }
                }

                i++;
            }

            return result;
        }
    }

    Scratch.extensions.register(new ScratchMath());
})(Scratch);
