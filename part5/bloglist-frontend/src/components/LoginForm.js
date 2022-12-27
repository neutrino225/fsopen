/** @format */

import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  username,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <h1>Login</h1>
        <div>
					username:{' '}
          <input
            value={username}
            onChange={handleUsername}
            id="login-username"
          />
        </div>
        <div>
					password:{' '}
          <input
            value={password}
            onChange={handlePassword}
            type="password"
            id="login-password"
          />
        </div>
        <button type="submit" id="login-button">
					login
        </button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
