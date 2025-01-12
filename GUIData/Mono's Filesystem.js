(function(Scratch) {
    'use strict';

    const extensionName = 'Monodeath\'s Filesystem';
    const extensionID = 'MonoFiles';

    let fileSystem = {};

    // Helper Functions
    function getPathArray(path) {
        return path.split('/').filter(part => part.trim() !== '');
    }

    function getFileOrFolder(path) {
        const parts = getPathArray(path);
        let current = fileSystem;
        for (let part of parts) {
            if (!(part in current)) return null;
            current = current[part];
        }
        return current;
    }

    function setFileOrFolder(path, content) {
        const parts = getPathArray(path);
        let current = fileSystem;
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!(part in current)) current[part] = {};
            current = current[part];
        }
        current[parts[parts.length - 1]] = content;
    }

    function deleteFileOrFolder(path) {
        const parts = getPathArray(path);
        let current = fileSystem;
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            if (!(part in current)) return false;
            current = current[part];
        }
        return delete current[parts[parts.length - 1]];
    }

    function renameFileOrFolder(oldPath, newPath) {
        const item = getFileOrFolder(oldPath);
        if (item === null) return false;
        setFileOrFolder(newPath, item);
        deleteFileOrFolder(oldPath);
        return true;
    }

    function isValidJSON(path) {
        const data = getFileOrFolder(path);
        if (typeof data !== 'string') return false;
        try {
            JSON.parse(data);
            return true;
        } catch (e) {
            return false;
        }
    }

    function formatAsJSON() {
        return JSON.stringify(fileSystem, null, 2);
    }

    function importJSONFileSystem(jsonString) {
        try {
            const parsedData = JSON.parse(jsonString);
            if (typeof parsedData === 'object') {
                fileSystem = parsedData;
                return 'Filesystem imported successfully!';
            } else {
                return 'Invalid JSON structure!';
            }
        } catch (e) {
            return 'Invalid JSON format!';
        }
    }

    // Extension Blocks
    class MonoFiles {
        getInfo() {
            return {
                id: extensionID,
                name: extensionName,
                color1: '#4C6EF5',
                color2: '#364FC7',
                blocks: [
                    {
                        opcode: 'createFolder',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'create folder at [PATH]',
                        arguments: {
                            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'NewFolder' }
                        }
                    },
                    {
                        opcode: 'createFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'create file at [PATH] with content [CONTENT]',
                        arguments: {
                            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'NewFile.txt' },
                            CONTENT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello World' }
                        }
                    },
                    {
                        opcode: 'deletePath',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete path [PATH]',
                        arguments: {
                            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'Folder/File.txt' }
                        }
                    },
                    {
                        opcode: 'renamePath',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'rename [OLDPATH] to [NEWPATH]',
                        arguments: {
                            OLDPATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'OldName' },
                            NEWPATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'NewName' }
                        }
                    },
                    {
                        opcode: 'getFileData',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get content of [PATH]',
                        arguments: {
                            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'File.txt' }
                        }
                    },
                    {
                        opcode: 'pathExists',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'does path [PATH] exist?',
                        arguments: {
                            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'Folder/File.txt' }
                        }
                    },
                    {
                        opcode: 'isValidJSON',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is [PATH] valid JSON?',
                        arguments: {
                            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'Data.json' }
                        }
                    },
                    {
                        opcode: 'formatFileSystemAsJSON',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'format filesystem as JSON'
                    },
                    {
                        opcode: 'getRawContent',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get raw content of [PATH]',
                        arguments: {
                            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'Folder/File.txt' }
                        }
                    },
                    {
                        opcode: 'importFileSystemFromJSON',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'import filesystem from JSON [JSONDATA]',
                        arguments: {
                            JSONDATA: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' }
                        }
                    }
                ]
            };
        }

        // Block Implementations
        createFolder(args) {
            const path = args.PATH;
            if (!getFileOrFolder(path)) {
                setFileOrFolder(path, {});
            }
        }

        createFile(args) {
            const path = args.PATH;
            const content = args.CONTENT;
            setFileOrFolder(path, content);
        }

        deletePath(args) {
            const path = args.PATH;
            deleteFileOrFolder(path);
        }

        renamePath(args) {
            const oldPath = args.OLDPATH;
            const newPath = args.NEWPATH;
            renameFileOrFolder(oldPath, newPath);
        }

        getFileData(args) {
            const path = args.PATH;
            const data = getFileOrFolder(path);
            return (typeof data === 'string') ? data : '[Not a file or does not exist]';
        }

        pathExists(args) {
            const path = args.PATH;
            return getFileOrFolder(path) !== null;
        }

        isValidJSON(args) {
            const path = args.PATH;
            return isValidJSON(path);
        }

        formatFileSystemAsJSON() {
            return formatAsJSON();
        }

        getRawContent(args) {
            const path = args.PATH;
            const data = getFileOrFolder(path);
            if (typeof data === 'object') {
                return JSON.stringify(data, null, 2);
            } else if (typeof data === 'string') {
                return data;
            } else {
                return '[Path does not exist]';
            }
        }

        importFileSystemFromJSON(args) {
            const jsonData = args.JSONDATA;
            return importJSONFileSystem(jsonData);
        }
    }

    Scratch.extensions.register(new MonoFiles());

})(Scratch);


