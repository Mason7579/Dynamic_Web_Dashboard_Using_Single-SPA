import '../styles.css';

const LiveIndicator = ({ isLive }) => {
  return isLive ? (
    <span id="live-indicator" style={{ color: '#4ade80' }}>
      Live
    </span>
  ) : (
    <span id="offline-indicator" style={{ color: '#f87171' }}>
      Offline
    </span>
  );
};

export default LiveIndicator;
