import React, { useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import cookies from 'js-cookie';
import { useNotificationContext } from '../context/NotificationContext';
import { NotificationType } from './Notification';
import _ from 'lodash';
import PollRow from './PollRow';

export type PollTypes = {
  title: string;
  options: Array<{ choice: string; voteCount: number }>;
  id: string;
};

const Poll = ({ id, title, options }: PollTypes) => {
  const [checkedBox, setCheckedBox] = React.useState<number>();
  const { triggerNewNotification } = useNotificationContext();
  const [votesState, setVotesState] = React.useState<{
    votes: Array<number>;
    voted: boolean;
  }>({ votes: [], voted: false });
  const currentData = cookies.get('pollsDone') || '{ "completed": [] }';
  const parsedData = JSON.parse(currentData);
  useEffect(() => {
    axios
      .get(
        `https://wfe0cgum.api.sanity.io/v2021-06-07/data/query/${process.env.GATSBY_SANITY_DATASET}?query=*[_id == "${id}"]`,
        {
          headers: {
            Authorization: `Bearer ${process.env.GATSBY_SANITY_API_TOKEN}`,
            'Access-Control-Allow-Headers': 'Authorization',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        setVotesState({
          votes: response.data.result[0].votes.votes,
          voted: parsedData.completed.includes(id),
        });
      });
  }, []);
  const handleSubmit = () => {
    const incrementIndex = `votes.votes[${checkedBox}]`;
    axios
      .post(
        `https://wfe0cgum.api.sanity.io/v2022-01-23/data/mutate/${process.env.GATSBY_SANITY_DATASET}`,
        {
          mutations: [
            {
              patch: {
                id: id,
                inc: {
                  [incrementIndex]: 1,
                },
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GATSBY_SANITY_API_TOKEN}`,
            'Access-Control-Allow-Headers': 'Authorization',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
      .then(() => {
        triggerNewNotification({
          message: `Thank you for submitting on this poll`,
          type: NotificationType.POSITIVE,
          id: _.uniqueId('NotificationId'),
        });
        parsedData.completed.push(id);
        cookies.set('pollsDone', JSON.stringify(parsedData), {
          expires: 2147483647,
        });
        setVotesState((prevVotesState) => {
          let modifiedVotes = prevVotesState?.votes;
          if (checkedBox) {
            modifiedVotes[checkedBox] += 1;
          }
          return {
            votes: modifiedVotes,
            voted: true,
          };
        });
      });
    return false;
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>{title}</Form.Field>
      {options.map((e, i) => {
        return (
          <PollRow
            choice={e.choice}
            setCheckedBox={setCheckedBox}
            index={i}
            checked={checkedBox === i}
            voted={votesState.voted}
            votes={votesState.votes[i]}
            totalVotes={votesState.votes.reduce((acc, vote) => {
              return acc + vote;
            }, 0)}
          />
        );
      })}
      {!votesState?.voted && <Button type="submit">Submit</Button>}
    </Form>
  );
};

export default Poll;
