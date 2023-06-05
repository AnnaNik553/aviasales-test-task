import { Alert, Space } from 'antd'

const ErrorMessage = () => {
  return (
    <Space direction="vertical" style={{ width: '100%', marginTop: '20px' }}>
      <Alert message="Error" description="something has gone terribly wrong" type="error" closable />
    </Space>
  )
}

export default ErrorMessage
