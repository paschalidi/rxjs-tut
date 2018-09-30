module.exports = {
  type: "react-app",
  babel: {
    stage: 0,
    runtime: true
  },
  webpack: {
    rules: {
      babel: {
        test: /\.jsx?$/
      }
    },
    html: {
      title: "jsx-tut"
    },
    extra: {
      resolve: {
        extensions: [".js", ".jsx"]
      }
    }
  }
};
