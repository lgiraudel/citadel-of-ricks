import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Space, Table, Typography, Image } from 'antd';
import { Character } from '../../models/character';
import { findCharacters, deleteCharacter } from '../../charactersAPI';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { useHistory } from 'react-router';

const { Title } = Typography;

function Characters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const characters = await findCharacters();
      setCharacters(characters);
    })();
  }, []);

  let searchInput;

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={confirm}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={confirm}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
  });

  const onDelete = character => async (event: React.MouseEvent) => {
    event.stopPropagation()
    await deleteCharacter(character._id);
    const newCharacters = characters.filter(current => current._id !== character._id);
    setCharacters(newCharacters);
  }

  const onRowClick = (character: Character) => () => {
    history.push(`/characters/${character._id}`);
  }

  const colums = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      render: (name, character) => {
        let avatar = null;
        if (character.combined_with && character.combined_with.length > 0) {
          avatar = <Avatar icon={<Image src={`https://rickandmortyapi.com/api/character/avatar/${character.combined_with[0]}.jpeg`} />} />
        }
        return <>{avatar} {name}</>
      }
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      ...getColumnSearchProps('gender'),
    },
    {
      title: 'Species',
      dataIndex: 'species',
      key: 'species',
      ...getColumnSearchProps('species'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      ...getColumnSearchProps('type'),
    },
    {
      title: '',
      key: 'action',
      render: (_, character) => <Button danger icon={<DeleteOutlined />} shape="circle" onClick={onDelete(character)} />
    }
  ]  

  return (
    <>
      <Title>Your Citadel citizens</Title>
      <div style={{textAlign: 'right'}}>
        <Link to="/characters/new?type=rick">
          <Button style={{marginRight: 5, marginBottom: 10}} size="large" type="primary" icon={<img style={{borderRadius: '50%'}} width={30} src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" />}> Create a new Rick</Button>
        </Link>
        <Link to="/characters/new?type=morty">
          <Button  size="large" type="primary" icon={<img style={{borderRadius: '50%'}} width={30} src="https://rickandmortyapi.com/api/character/avatar/2.jpeg" />}>Create a new Morty</Button>
        </Link>
      </div>
      <Table dataSource={characters} columns={colums} rowKey="id" onRow={(character) => ({
        onClick: onRowClick(character),
      })} />
    </>
  )
}

export {
  Characters as default,
}