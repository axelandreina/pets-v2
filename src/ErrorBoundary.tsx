import { Component, ErrorInfo, ReactElement } from "react";
import { Link } from "react-router-dom";

// This has to be a class component because there is no way to do this in a functional ocmponent, even with React v18
class ErrorBoundary extends Component<{ children: ReactElement }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Typically you would log this to something like TrackJS or NewRelic
    console.log("ErrorBoundary component caught error: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing.{" "}
          <Link to="/">Click here to the home page.</Link>
        </h2>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
