// Name: Find Matching Keys
// ID: KeyMatcher
// Description: Just a key comparator thingy
// By: Monodeath <https://scratch.mit.edu/users/BekfastKingRyan/>
// License: MIT

((Scratch) => {
    "use strict";

    class KeyMatcher {
        getInfo() {
            return {
                id: "KeyMatcher",
                name: "Find Matching Keys",
                color1: "#527280",
                blocks: [
                    {
                        opcode: "findKeysWithValue",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "find all keys in [JSON] with value [VALUE]",
                        arguments: {
                            JSON: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"a": {"b": "hello"}, "c": "hello"}'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "hello"
                            }
                        }
                    },
                    {
                        opcode: "findKeysWithValueSpecial",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "find all keys in [JSON] with value [VALUE] with rule [RULE]",
                        arguments: {
                            JSON: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"a": {"b": "hello"}, "c": "hello"}'
                            },
                            VALUE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'hello'
                            },
                            RULE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'ruleMenu',
                                defaultValue: 'noRule'
                            }
                        }
                    }
                ],
                menus: {
                    ruleMenu: {
                        items: [
                            'noRule',
                            'doNotSearchNestedJSON',
                            'returnOnlyFirstKey',
                            'returnOnlyLastKey',
                            'StartsWith'
                        ]
                    }
                }
            };
        }

        findKeysWithValue(args) {
            try {
                const obj = JSON.parse(args.JSON);
                const targetValue = args.VALUE;
                const matchingKeys = [];

                function search(o) {
                    for (const key in o) {
                        const value = o[key];
                        let valueStr;
                        if (value && typeof value === 'object') {
                            valueStr = JSON.stringify(value);
                        } else {
                            valueStr = String(value);
                        }
                        if (valueStr === targetValue) {
                            matchingKeys.push(key);
                        }
                        if (value && typeof value === 'object') {
                            search(value);
                        }
                    }
                }

                search(obj);
                return JSON.stringify(matchingKeys);
            } catch (e) {
                return "[]";
            }
        }

        findKeysWithValueSpecial(args) {
            try {
                const obj = JSON.parse(args.JSON);
                const targetValue = args.VALUE;
                const rule = args.RULE;
                let matchingKeys = [];

                if (rule === 'doNotSearchNestedJSON') {
                    // Only check top-level keys, same logic: stringify objects, string for primitives
                    for (const key in obj) {
                        const value = obj[key];
                        let valueStr;
                        if (value && typeof value === 'object') {
                            valueStr = JSON.stringify(value);
                        } else {
                            valueStr = String(value);
                        }
                        if (valueStr === targetValue) {
                            matchingKeys.push(key);
                        }
                    }

                } else if (rule === 'StartsWith') {
                    // Recursive search, startsWith
                    function search(o) {
                        for (const key in o) {
                            const value = o[key];
                            let valueStr;
                            if (value && typeof value === 'object') {
                                valueStr = JSON.stringify(value);
                            } else {
                                valueStr = String(value);
                            }
                            if (valueStr.startsWith(targetValue)) {
                                matchingKeys.push(key);
                            }
                            if (value && typeof value === 'object') {
                                search(value);
                            }
                        }
                    }
                    search(obj);

                } else {
                    // noRule, returnOnlyFirstKey, returnOnlyLastKey
                    function search(o) {
                        for (const key in o) {
                            const value = o[key];
                            let valueStr;
                            if (value && typeof value === 'object') {
                                valueStr = JSON.stringify(value);
                            } else {
                                valueStr = String(value);
                            }
                            if (valueStr === targetValue) {
                                matchingKeys.push(key);
                            }
                            if (value && typeof value === 'object') {
                                search(value);
                            }
                        }
                    }
                    search(obj);
                }

                // Apply first/last key filter if needed
                if (rule === 'returnOnlyFirstKey' && matchingKeys.length > 0) {
                    matchingKeys = [matchingKeys[0]];
                } else if (rule === 'returnOnlyLastKey' && matchingKeys.length > 0) {
                    matchingKeys = [matchingKeys[matchingKeys.length - 1]];
                }

                return JSON.stringify(matchingKeys);
            } catch (e) {
                return "[]";
            }
        }
    }

    Scratch.extensions.register(new KeyMatcher());
})(Scratch);
