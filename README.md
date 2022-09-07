# LinkedIn Clone with REACT.JS! 

## <a href="https://linked-in-clone-liard.vercel.app" target="_blank">🔴 LIVE DEMO</a>

#### PREREQUISITES:
- Install Node JS in your computer <a href='https://nodejs.org/en/'>HERE</a>
- Sign up for a Firebase account <a href='https://firebase.google.com'>HERE</a>


<a href="#"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="" width="30" height="30" /></a>
<a href="#"><img src="https://user-images.githubusercontent.com/99184393/183096870-fdf58e59-d78c-44f4-bd1c-f9033c16d907.png" alt="Google" width="30" height="30" /></a>
<a href="#"><img src="https://user-images.githubusercontent.com/99184393/180462270-ea4a249c-627c-4479-9431-5c3fd25454c4.png" alt="" width="30" height="30" /></a>
<a href="#"><img src="https://user-images.githubusercontent.com/99184393/179383376-874f547c-4e6f-4826-850e-706b009e7e2b.png" alt="" width="30" height="30" /></a>
<a href="#"><img src="https://user-images.githubusercontent.com/99184393/187247836-8df8fb4e-074c-4f3a-a150-555108f4c2c7.png" alt="" width="30" height="30" /></a>
<a href="#"><img src="https://user-images.githubusercontent.com/99184393/177784603-d69e9d02-721a-4bce-b9b3-949165d2edeb.png" alt="" width="30" height="30" /></a>
<a href="#"><img src="https://user-images.githubusercontent.com/99184393/180461713-76c02155-35f5-497e-b3a3-364fec13da39.png" alt="" width="30" height="30" /></a>
<a href="#"><img src="https://raw.githubusercontent.com/atulmy/oauth/master/web/public/images/social/google.svg" alt="" width="30" height="30" /></a>
<a href="#"><img src="https://raw.githubusercontent.com/atulmy/oauth/master/web/public/images/tech/github.svg" alt="" width="30" height="30" /></a>
<a href="#"><img src="https://user-images.githubusercontent.com/99184393/188185026-93637cf8-67e9-439a-b33a-6feba7b8bd21.png" alt="" width="30" height="30" /></a>
<br>
<hr />

<div align="center">
<a href="https://linked-in-clone-liard.vercel.app"><img  src='https://user-images.githubusercontent.com/99184393/188789531-e987f621-42c0-4331-b59c-15567f672b8d.gif' alt='image'/></a>
</div>

<br />

## Available Scripts
```
npx create-next-app my-project
```
```
cd my-project
```
<hr />

## Install Tailwind CSS with Next.js
#### Install Tailwind CSS
`Install tailwindcss and its peer dependencies via npm, and then run the init command to generate both tailwind.config.js and postcss.config.js.`
```
npm install -D tailwindcss postcss autoprefixer
```
```
npx tailwindcss init -p
```
#### Configure your template paths
`Add the paths to all of your template files in your tailwind.config.js file.`
<br>
```
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
#### Add the Tailwind directives to your CSS
`Add the @tailwind directives for each of Tailwind’s layers to your ./styles/globals.css file.`
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
<hr />

### In your Next.js project, install Chakra UI
#### Installation
In your Next.js project, install Chakra UI by running either of the following:
```
npm i @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
or
yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^6
```

Provider Setup
After installing Chakra UI, you need to set up the ``ChakraProvider`` at the root of your application.

Go to ``pages/_app.js`` or ``pages/_app.tsx`` (create it if it doesn't exist) and wrap the ``Component`` with the ``ChakraProvider``:
```
// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
```

<a href="https://chakra-ui.com/getting-started/nextjs-guide" target="_blank">🔷 Customizing theme & More</a>
<br />
<a href="https://github.com/SashenJayathilaka/LinkedIn-Clone/blob/master/package.json" target="_blank">🔶 Other Dependency Info</a>

<hr />
<br />

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

#### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
<hr />

<a href='https://linked-in-clone-liard.vercel.app'>![image](https://user-images.githubusercontent.com/99184393/188188483-1ebbc6f9-7fb5-4a50-96ae-3e9ae0f2b396.png)</a>
