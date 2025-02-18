import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const pageStyles = css`
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

const ClubGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const ClubCard = styled.div`
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`

const ClubContent = styled.div`
  padding: 1.5rem;
`

const ClubTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const ClubDescription = styled.p`
  color: #666;
  margin-bottom: 1rem;
`

const ClubFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MemberCount = styled.span`
  font-size: 0.875rem;
  color: #888;
`

export default function Clubs() {
  return (
    <div css={pageStyles}>
      <PageTitle>Student Clubs</PageTitle>
      <FilterContainer>
        <Input type="text" placeholder="Search clubs..." className="w-64" />
        <Button className="bg-black text-yellow-400 hover:bg-gray-800">Create Club</Button>
      </FilterContainer>
      <ClubGrid>
        {[1, 2, 3, 4, 5, 6].map((club) => (
          <ClubCard key={club}>
            <ClubContent>
              <ClubTitle>Club Name</ClubTitle>
              <ClubDescription>Brief description of the club and its activities.</ClubDescription>
              <ClubFooter>
                <MemberCount>Members: 50</MemberCount>
                <Button variant="outline">Join Club</Button>
              </ClubFooter>
            </ClubContent>
          </ClubCard>
        ))}
      </ClubGrid>
    </div>
  )
}

