import { ListingResponseDTO } from '../../types/api';
import ListingCard from './ListingCard';
import { ListingCardMedia } from './ListingCardMedia';
import { ListingCardInfo } from './ListingCardInfo';

type Props = {
  items: ListingResponseDTO[];
  onSelect?: (id: string) => void;
  selectedId?: string;
  renderFooter?: (listing: ListingResponseDTO) => React.ReactNode;
};

export default function ListingGrid({
  items,
  onSelect,
  selectedId,
  renderFooter,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((listing) => {
        const isSelected = selectedId === listing.id;
        const Wrapper = onSelect ? 'button' : 'div';

        return (
          <Wrapper
            key={listing.id}
            onClick={() => onSelect?.(listing.id)}
            className={`
              text-left rounded-lg
              ${onSelect ? 'cursor-pointer' : ''}
              ${isSelected ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            <ListingCard>
              <ListingCardMedia
                src={listing.images?.[0]}
                alt={listing.title}
              />

              <div className="flex flex-col justify-between flex-1">
                <ListingCardInfo listing={listing} />
                {renderFooter && (
                  <div className="mt-2">{renderFooter(listing)}</div>
                )}
              </div>
            </ListingCard>
          </Wrapper>
        );
      })}
    </div>
  );
}