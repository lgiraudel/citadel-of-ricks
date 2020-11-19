import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, Image, Avatar } from 'antd';
import { createCharacter } from '../../charactersAPI';
import { Character } from '../../models/character';
import { find } from '../../realCharactersAPI';
import { useHistory, useLocation } from 'react-router';
import { RealCharacter } from '../../models/realCharacter';
import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function New() {
  const [realCharacters, setRealCharacters] = useState<RealCharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<RealCharacter>();
  const [originCharacter, setOriginCharacter] = useState<RealCharacter>();
  const [genders, setGenders] = useState<Array<string>>([]);
  const [types, setTypes] = useState<Array<string>>([]);
  const [species, setSpecies] = useState<Array<string>>([]);
  const history = useHistory();
  const [form] = Form.useForm();

  const query = useQuery();
  const type = query.get('type');

  useEffect((): void => {
    (async () => {
      const characters = await find();

      const originCharacter = characters.find(character => {
        return (
          (type === 'rick' && character.name === 'Rick Sanchez') ||
          (type === 'morty' && character.name === 'Morty Smith')
        );
      });
      setOriginCharacter(originCharacter);

      const genders = [...new Set(characters.map(character => character.gender))];
      setGenders(genders);

      const filteredCharacters = characters.filter(character => character !== originCharacter);
      setRealCharacters(filteredCharacters);

      const types = [...new Set(characters.map(character => character.type))];
      setTypes(types);

      const species = [...new Set(characters.map(character => character.species))];
      setSpecies(species);
    })();
  }, [type]);

  const onFinish = async (values: Character) => {
    const res = await createCharacter(values);
    history.push('/characters');
  }
  
  const combinedChange = (id: number): void => {
    const character = realCharacters.find(character => character.id === id);
    setSelectedCharacter(character);
    form.setFieldsValue({ combined_with: [originCharacter.id, character.id] });
  }

  const cancel = () => {
    history.push('/characters');
  }

  const imageSize = 100;
  const defaultImage = <Avatar size={imageSize} shape="square" icon={<UserOutlined />} />
  const combinedCharacterImage = selectedCharacter ? <Image width={imageSize} src={selectedCharacter.image} /> : defaultImage;
  const originCharacterImage = originCharacter ? <Image width={imageSize} src={originCharacter.image} /> : defaultImage;

  return (
    <Form
      form={form}
      {...layout}
      name="new"
      onFinish={onFinish}
      style={{backgroundColor: '#fff', padding: '1em', width: '80%'}}
    >
      <Form.Item
        label="New character name"
        name="name"
        rules={[{ required: true, message: 'Please choose a name for your new character' }]}
      >
        <Input style={{ width: 200 }} />
      </Form.Item>

      <Form.Item
        label={`Create a new character half ${originCharacter ? originCharacter.name : null} / half`}
        name="combined_with"
        rules={[{ required: true, message: 'You must pick a character to combine with' }]}
      >
         <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a character"
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          onChange={combinedChange}
        >
          {realCharacters.map(character => (<Option key={character.id} value={character.id}>{character.name}</Option>))}
        </Select>
        <div style={{margin: '1em 0 0'}}>
          {originCharacterImage} + {combinedCharacterImage}
        </div>
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: 'You need to pick a gender for your new character' }]}
      >
        <Select
          style={{ width: 200 }}
          placeholder="Select a gender"
        >
          {genders.map(str => (<Option key={str} value={str}>{str}</Option>))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Species"
        name="species"
        rules={[{ required: true, message: 'You need to pick a species for your new character' }]}
      >
        <Select
          style={{ width: 200 }}
          placeholder="Select a species"
        >
          {species.map(str => (<Option key={str} value={str}>{str}</Option>))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Type or subspecies"
        name="type"
      >
        <Select
          style={{ width: 200 }}
          placeholder="Select a type or subspecies"
        >
          {types.map(str => (<Option key={str} value={str}>{str}</Option>))}
        </Select>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">Create</Button>
        <Button htmlType="button" onClick={cancel}>Cancel</Button>
      </Form.Item>
    </Form>
  )
}

export {
  New as default,
}