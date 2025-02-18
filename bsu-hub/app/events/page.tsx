import styled from "styled-components"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 1.5rem;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const SearchFilters = styled.div`
  display: flex;
  gap: 1rem;
`

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const EventCard = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`

const EventContent = styled.div`
  padding: 1.5rem;
`

const EventTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const EventDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
`

const EventFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const EventDate = styled.span`
  font-size: 0.875rem;
  color: #888;
`

export default function Events() {
  return (
    <PageContainer>
      <PageTitle>Campus Events</PageTitle>
      <FilterContainer>
        <SearchFilters>
          <Input type="text" placeholder="Search events..." className="w-64" />
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="social">Social</SelectItem>
              <SelectItem value="career">Career</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
            </SelectContent>
          </Select>
        </SearchFilters>
        <Button className="bg-black text-yellow-400 hover:bg-gray-800">Create Event</Button>
      </FilterContainer>
      <EventGrid>
        {[1, 2, 3, 4, 5, 6].map((event) => (
          <EventCard key={event}>
            <EventContent>
              <EventTitle>Event Title</EventTitle>
              <EventDescription>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</EventDescription>
              <EventFooter>
                <EventDate>Date: MM/DD/YYYY</EventDate>
                <Button variant="outline">RSVP</Button>
              </EventFooter>
            </EventContent>
          </EventCard>
        ))}
      </EventGrid>
    </PageContainer>
  )
}

