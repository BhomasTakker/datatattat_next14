## Datatattat

# Testing

## Roles https://www.w3.org/TR/html-aria/#docconformance

## Mock Components src\components\header\client-header.test.tsx

## Mock Functions src\components\header\client-header.test.tsx

## use waitFor to load components with state - src\components\header\client-header.test.tsx

## Mock function AND update mock return src\components\header\client-header.test.tsx

## Render async component work around src\components\header\navigation-header.test.tsx from https://stackoverflow.com/questions/75729282/testing-an-async-server-component-with-jest-in-next-13

`const { container } = render(await NavigationHeader());`

## Test null component render

`const { container } = render(<SubHeaders headersArray={[]} />); expect(container).toBeEmptyDOMElement();`
