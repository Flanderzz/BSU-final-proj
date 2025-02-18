import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import styles from "./study-groups.module.css"

export default function StudyGroups() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Study Groups</h1>
      <div className={styles.filterContainer}>
        <div className={styles.searchFilters}>
          <Input type="text" placeholder="Search study groups..." className="w-64" />
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math101">Math 101</SelectItem>
              <SelectItem value="cs201">CS 201</SelectItem>
              <SelectItem value="bio301">BIO 301</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-black text-yellow-400 hover:bg-gray-800">Create Study Group</Button>
      </div>
      <div className={styles.groupGrid}>
        {[1, 2, 3, 4, 5, 6].map((group) => (
          <div key={group} className={styles.groupCard}>
            <div className={styles.groupContent}>
              <h3 className={styles.groupTitle}>Study Group Name</h3>
              <p className={styles.groupDescription}>Course: CS 201 - Data Structures</p>
              <div className={styles.groupFooter}>
                <span className={styles.memberCount}>Members: 5/10</span>
                <Button variant="outline">Join Group</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

