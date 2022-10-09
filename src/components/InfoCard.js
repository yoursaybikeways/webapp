import { get, getOr } from 'lodash/fp';
import { Card, Typography, Descriptions } from 'antd';
import { lgaLabel, tagLabel, stateLabel } from '../data';


const InfoCard = ({picked}) => {
    const key = get('key', picked);
    const title = get('title', picked);
    const lga = get('lga', picked);
    const url = get('url', picked);
    const tags = getOr([])('tags')(picked).map(get('key'));
    const state = get('state.key', picked)
    const last_updated = get('last_updated', picked)
    const last_cited = get('last_cited', picked)

    return (
        <Card style={{marginBottom: 4}} title="Selected">
            { (key !== undefined) ? 
                <Descriptions column={1}>
                    <Descriptions.Item label="Title"><Typography.Text>{title}</Typography.Text></Descriptions.Item>
                    <Descriptions.Item label="Status"><Typography.Text>{stateLabel(state)}</Typography.Text></Descriptions.Item>
                    <Descriptions.Item label="LGA"><Typography.Text>{lgaLabel(lga)}</Typography.Text></Descriptions.Item>
                    <Descriptions.Item label="URL"><Typography.Link href={url} target="_blank">{url}</Typography.Link></Descriptions.Item>
                    <Descriptions.Item label="Tags">
                        <Typography.Text>
                            {tags.map(tagLabel).join(", ")}
                        </Typography.Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Last updated"><Typography.Text>{last_updated}</Typography.Text></Descriptions.Item>
                    <Descriptions.Item label="Last cited"><Typography.Text>{last_cited}</Typography.Text></Descriptions.Item>
                </Descriptions> :
                <Typography.Text>Click a project on the map to see more</Typography.Text> 
            }
        </Card>
    )
}

export { InfoCard };
