<template>
    <v-card class="benefits-sports">
        <v-card-title>
            Benefits of Sports for Adolescents
        </v-card-title>
        <v-card-text>
            <v-expansion-panels accordion focusable>
                <v-expansion-panel
                v-for="(item,i) in items"
                :key="i"
                >
                <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    {{item.content}}
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card-text>
    </v-card>
  
</template>

<script>
export default {
    data : function(){
        return {
            items : [
                { 
                    title : 'Many athletes do better academically ',
                    content : 'Playing a sport requires a lot of time and energy. Some people may think this would distract student-athletes from schoolwork. However, the opposite is true. Sports require memorization, repetition and learning — skillsets that are directly relevant to class work. Also, the determination and goal-setting skills a sport requires can be transferred to the classroom.'
                },
                {
                    title : 'Sports teach teamwork and problem-solving skills',
                    content : 'Fighting for a common goal with a group of players and coaches teaches you how to build teamwork and effectively communicate to solve problems. This experience is helpful when encountering problems at work or at home.'
                },
                {
                    title : 'Physical health benefits of sports',
                    content : 'Clearly, sports can help you reach your fitness goals and maintain a healthy weight. However, they also encourage healthy decision-making such as not smoking and not drinking. Sports also have hidden health benefits such as lowering the chance of osteoporosis or breast cancer later in life.'
                },
                 {
                    title : 'Sports boost self-esteem',
                    content : 'Watching your hard work pay off and achieving your goals develops self-confidence. Achieving a sport or fitness goal encourages you to achieve other goals you set. This is a rewarding and exciting learning process.'
                },
                 {
                    title : 'Reduce pressure and stress with sports',
                    content : 'Exercising is a natural way to loosen up and let go of stress. You can also make new friends who can be there for you as a support system. When you feel under pressure or stressed, call up a teammate, head to the gym to talk and play it out.'
                }
            ]
        }
    }
}
</script>

<style scoped>
    .benefits-sports{
        margin-top: 20px;
    }
</style>