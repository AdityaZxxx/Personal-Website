// This is a placeholder file to simulate the framer-motion package
// In a real project, you would install framer-motion via npm
// and import it directly in your components

// export const motion = {
//     div: (props: any) => <div {...props} />,
//     h1: (props: any) => <h1 {...props} />,
//     h2: (props: any) => <h2 {...props} />,
//     h3: (props: any) => <h3 {...props} />,
//     p: (props: any) => <p {...props} />,
//     ul: (props: any) => <ul {...props} />,
//     li: (props: any) => <li {...props} />,
//     section: (props: any) => <section {...props} />,
//   }

  export const useInView = (options: any) => {
    return [true, { entry: null }]
  }

  export const useScroll = () => {
    return { scrollYProgress: { current: 0 } }
  }

  export const useTransform = (progress: any, input: any, output: any) => {
    return 0
  }

  export const useSpring = (value: any) => {
    return value
  }

