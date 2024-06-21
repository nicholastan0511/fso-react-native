import { FlatList, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

const styles = {
  textInput: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderSize: 2,
    borderStyle: 'solid'
  }
}

const SearchForm = ({ refetch }) => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [value] = useDebounce(searchKeyword, 500) 
  
  useEffect(() => {
    handleRefetch(value)
  }, [value])

  const handleRefetch = async (searchKeyword) => {
    await refetch({
      searchKeyword
    })
  }

  return (
    <TextInput 
        placeholder='Zeit'
        onChangeText={setSearchKeyword}
        value={searchKeyword}
        style={styles.textInput}
    />
  )
}

export default SearchForm


