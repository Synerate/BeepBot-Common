const tasksRegex = /(\d+)(.*?)(\d+|$)/;

/**
 * Collect parts of a string array based on the task provided.
 */
function collectParts(parts: string[], task: string): string[] {
  let result = tasksRegex.exec(task);
  if (result == null) {
    throw new Error('Invalid task format');
  }
  switch (result[2]) {
    case '..':
      return parts.slice(parseInt(result[1]));
    case '-':
      return parts.slice(parseInt(result[1]), parseInt(result[3]));
    default:
      return [parts[parseInt(result[1])]];
  }
}

/**
 * Strip any kind of user tagging from the name.
 */
function stripUserTag(user: string): string {
  return user.replace('#', '').replace('@', '');
}

/**
 * Strip a command prefix from the string.
 */
function stripCommand(prefix: string, str: string): string {
  return str.replace(prefix, '');
}

/**
 * Parse bytes to a human readable format.
 */
function bytesToSize(bytes: number): string {
  if (bytes == 0) {
    return '0 Byte';
  } else {
    let k = 1024;
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }
}

/**
 * Convert bytes to a human readable format.
 */
export const Utils = {
  collectParts: collectParts,
  stripUserTag: stripUserTag,
  stripCommand: stripCommand,
  bytesToSize: bytesToSize
};
