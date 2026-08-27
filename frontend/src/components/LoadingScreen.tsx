function LoadingScreen() {

  return (

    <div className="loading-screen">

      <div className="loading-orca">
        🐋
      </div>


      <h2>
        ORCA IS ANALYZING...
      </h2>


      <div className="loading-steps">

        <p>
          ✓ Understanding question
        </p>

        <p>
          ✓ Checking weather
        </p>

        <p>
          ✓ Checking ocean
        </p>

        <p>
          ✓ Checking satellite
        </p>

        <p>
          ✓ Checking GIS
        </p>

        <p>
          ⏳ Calculating risk
        </p>

      </div>

    </div>

  );
}


export default LoadingScreen;