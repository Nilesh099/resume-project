import { FixedSizeList as List } from 'react-window'

function VirtualizedList({ items, renderItem, height = 400, itemHeight = 100 }) {
  const ItemRenderer = ({ index, style }) => (
    <div style={style}>
      {renderItem(items[index], index)}
    </div>
  )

  if (items.length <= 15) {
    // Render normally if less than 15 items
    return (
      <div>
        {items.map((item, index) => renderItem(item, index))}
      </div>
    )
  }

  // Use virtualization for large lists
  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      width="100%"
    >
      {ItemRenderer}
    </List>
  )
}

export default VirtualizedList
