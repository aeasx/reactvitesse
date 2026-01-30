/* eslint-disable @typescript-eslint/no-explicit-any */
// ...existing code...
import { Button, Card, Form, Input, Switch } from 'antd'
import { useEffect, useState, type FC, forwardRef, useImperativeHandle, useRef } from 'react'
const getPortConfigApi = () => {
  return new Promise<boolean[]>(resolve => {
    return setTimeout(() => {
      resolve([true, true, false, true])
    }, 300)
  })
}
export const Home: FC = () => {
  const [goodsList, setGoodsList] = useState<boolean[]>([])
  const [formData, setFormData] = useState<Record<string, any>>({})
  // 保存每个子组件的 ref
  const childRefs = useRef<Record<number, any>>({})

  useEffect(() => {
    getPortConfigApi().then(res => { setGoodsList(res) })
  }, [])
  const handleChildChange = (idx: number, values: any) => {
    setFormData(pre => ({ ...pre, [idx]: values }))
    console.log(`child form change`);
  }

  // 父组件点击时收集所有子表单值（会执行 validateFields）
  const handleCollect = async () => {
    const result: Record<number, any> = {}
    for (let i = 0; i < goodsList.length; i++) {
      const child = childRefs.current[i]
      if (!child) continue
      if (child.validate) {
        try {
          result[i] = await child.validate()
        } catch (err) {
          // 验证失败，也可以改为 child.getValues()
          result[i] = { __error: err }
        }
      } else if (child.getValues) {
        result[i] = child.getValues()
      } else {
        result[i] = {}
      }
    }
    setFormData(result)
    console.log('收集到的所有表单值：', result)
  }

  return (
    <div className="text-3xl flex flex-col items-center">
      <div style={{ marginBottom: 12 }}>
        <Button type="primary" onClick={handleCollect}>收集所有表单值</Button>
      </div>
      {
        goodsList.map((x, xIndex) => (
          <div key={xIndex}>
            {x ? '表单' + xIndex : '表单' + xIndex + '(空)'}
            <TestChild
              ref={el => (childRefs.current[xIndex] = el)}
              index={xIndex}
              onChange={handleChildChange}
              initialValues={formData[xIndex] || {}}
            />
          </div>
        ))
      }
      <div>
        <pre style={{ background: '#fafafa', padding: 12 }}>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  )
}
interface TestProps {
  index?: number
  initialValues?: any
  onChange?: (index: number, values: any) => void
}

// 使用 forwardRef 暴露方法给父组件
const TestChild = forwardRef<any, TestProps>(({ index = 0, initialValues = {}, onChange }, ref) => {
  const [form] = Form.useForm()

  useImperativeHandle(ref, () => ({
    getValues: () => form.getFieldsValue(),
    validate: () => form.validateFields()
  }), [form])

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues])
  return (
    <Card style={{ border: '1px solid red', padding: 16 }}>
      <Form form={form} initialValues={initialValues} layout='vertical'
        onValuesChange={(_, all) => { onChange?.(index, all) }}
      >
        <Form.Item label="姓名" name="name" required rules={[{ required: true, message: '请输入姓名' }]}>
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item label='是否同意' name='agree' valuePropName='checked'>
          <Switch />
        </Form.Item>
      </Form>
    </Card>
  )
})
