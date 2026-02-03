import { Button, Checkbox, Col, ConfigProvider, Form, Row, theme, type CheckboxProps } from 'antd'
import { useState, type FC } from 'react'
export const About: FC = () => {
  const [form] = Form.useForm()
  return (
    <div>
      <h1 className="font-bold text-stone-600">About Page</h1>
      <Form form={form}>
        <CheckBoxAll />
        <Button type="primary" htmlType="submit">提交</Button>
      </Form>
    </div>
  )
}

const checkedOptionsList = [
  { label: '正信鸡排', value: '1' },
  { label: '速走', value: '2' },
  { label: '黄山', value: '3' },
]

const CheckBoxAll = () => {
  const [checkedList, setCheckedList] = useState<string[]>(['1', '2']);
  const checkAll = checkedOptionsList.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < checkedOptionsList.length;
  const onChange = (list: string[]) => {
    setCheckedList(list);
  };

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? checkedOptionsList.map(item => item.value) : []);
  };

  return (
    <ConfigProvider
      theme={{ algorithm: theme.darkAlgorithm }}>
      <Row>
        <Col span={24}>
          <Form.Item label='品牌' labelCol={{ span: 2 }}>
            <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={onCheckAllChange}>全选</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} offset={2}>
          <Form.Item>
            <Checkbox.Group onChange={onChange} value={checkedList} >
              {
                checkedOptionsList.map(item => {
                  return (
                    <Checkbox value={item.value} key={item.value}>{item.label}</Checkbox>
                  )
                })
              }
            </Checkbox.Group>
          </Form.Item >
        </Col>
      </Row>
    </ConfigProvider >
  )
}
