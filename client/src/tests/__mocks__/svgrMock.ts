/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
/**
 * Custom mock for imported SVG files in Jest test files.
 *
 * // MyComponent.tsx
 * import SomeIcon from '../assets/someIcon.svg
 *
 * // MyComponent.unit.test.tsx
 * Will render a snapshow with <testicon {other attributes} />
 */
import * as React from 'react';
export default 'test-icon';
export const ReactComponent = 'div';
