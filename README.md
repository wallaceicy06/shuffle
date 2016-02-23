# Shuffle

*Shuffle* takes formatted lists of items and randomly sorts them. If
you choose to provide numerical values for the items, then it will also
maintain a priority order in the random results. 

Visit [here](http://wallaceicy06.github.io/shuffle) for a live version of the
app.

## Usage

1. Prepare a text file of items (and numerical values, if you desire), one per
line. *Shuffle* supports the following formats:
   - `.csv`, separate names from values with commas
   - `.tsv`, separate names from values with tabs
   - `.txt`, each line considered as one item with no value
2. Hover over the floating action button, and click the green import button.
Select the file and click **import**.
3. Hover over the floating action button, and click the blue settings button to
adjust settings for your shuffle.
   - *Results delay* adjusts the time in seconds between subsequent "draws" of
     cards
   - *Point priority* toggles whether high or low numerical values correspond
     to high or low priority
   - *Waitlist cutoff* sets the number of results after which the waitlist
     begins
4. Click the floating play button to shuffle the cards and display the results.
5. Hover over the floating action button, and click the orange export button to
export the results to a text file.

## Background

*Shuffle* was created as a more user-friendly replacement to the command line
programs [Eligibility](https://github.com/wallaceicy06/Eligibility) and [Room
Draw](https://github.com/wallaceicy06/RoomDraw). Both of these programs were
used at McMurtry College at Rice University to determine ordered lists for
housing selection.

The students who managed housing had always been programming literate, and thus
the command line programs worked for a number of years. It became clear that
once a non-programmer had to run these systems, a web-based version was needed.
And thus, *Shuffle* was born.

And as with most projects, I procrastinated and left it until the last second.
There are certainly rough edges, but it is nevertheless a decent program for
something that was hacked together in a week. :)

## Credits

Thanks are due to the [Materialize](https://github.com/Dogfalo/materialize) and
[Shuffle](https://github.com/daneden/animate.css) libraries for which this
project could not have been possible.

Thanks to the original authors of the command line programs: my colleagues
[Kevin Lin](https://github.com/kevinslin) (Rice '13) and [Adam
Bloom](https://github.com/adam-bloom) (Rice '15).
