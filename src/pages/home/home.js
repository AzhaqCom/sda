import React from 'react'

function home() {
  return (
    <div className='container'>
      <h2 className='blue'>Tableau des blessures</h2>
      <table>
        <tbody>
          <tr>
            <th> F/E</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
          </tr>
          <tr>
            <th>1</th>
            <td className='red'>4</td>
            <td>5</td>
            <td>5</td>
            <td>6</td>
            <td>6</td>
            <td>6/4</td>
            <td>6/5</td>
            <td>6/6</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <th>2</th>
            <td>4</td>
            <td className='red'>4</td>
            <td>5</td>
            <td>5</td>
            <td>6</td>
            <td>6</td>
            <td>6/4</td>
            <td>6/5</td>
            <td>6/6</td>
            <td>-</td>
          </tr>
          <tr>
            <th>3</th>
            <td>3</td>
            <td>4</td>
            <td className='red'>4</td>
            <td>5</td>
            <td>5</td>
            <td>6</td>
            <td>6</td>
            <td>6/4</td>
            <td>6/5</td>
            <td>6/6</td>
          </tr>
          <tr>
            <th>4</th>
            <td>3</td>
            <td>3</td>
            <td>4</td>
            <td className='red'>4</td>
            <td>5</td>
            <td>5</td>
            <td>6</td>
            <td>6</td>
            <td>6/4</td>
            <td>6/5</td>
          </tr>
          <tr>
            <th>5</th>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>4</td>
            <td className='red'>4</td>
            <td>5</td>
            <td>5</td>
            <td>6</td>
            <td>6</td>
            <td>6/4</td>
          </tr>
          <tr>
            <th>6</th>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>4</td>
            <td className='red'>4</td>
            <td>5</td>
            <td>5</td>
            <td>6</td>
            <td>6</td>
          </tr>
          <tr>
            <th>7</th>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>4</td>
            <td className='red'>4</td>
            <td>5</td>
            <td>5</td>
            <td>6</td>
          </tr>
          <tr>
            <th>8</th>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>4</td>
            <td className='red'>4</td>
            <td>5</td>
            <td>5</td>
          </tr>
          <tr>
            <th>9</th>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>4</td>
            <td className='red'>4</td>
            <td>5</td>
          </tr>
          <tr>
            <th>10</th>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>3</td>
            <td>4</td>
            <td className='red'>4</td>
          </tr>
        </tbody>
      </table>
      <div>
        <h3 className='blue'>Élan Héroïque (phase de Mouvement)</h3>
        <p>Un Élan Héroïque donne l'opportunité au Héros de se déplacer avant les autres figurines - en court-circuitant ainsi l'ordre d'initiative. Le Héros peut bouger, sauter, escalader, charger et même utiliser sa règle "Tenez-bon !" de manière habituelle. </p>
        <p>Cette Action Héroïque peut se montrer particulièrement utile, et il arrive souvent que le joueur ayant l'initiative déclare lui-même un Élan Héroïque après que le joueur n'ayant pas l'initiative en ait déclaré un, de manière à avoir une chance de garder l'initiative. Si un Héros déclare qu'il va tenter un Élan Héroïque mais qu'il est chargé avant de le faire, l'Élan Héroïque est annulé et le point de puissance perdu.</p>
        <h4 className='blue'>"Avec Moi !"</h4>
        <p>Un Héros qui fait un Élan Héroïque peut décider de crier "Avec Moi !". Dans ce cas, notez la position de départ du Héros. Toutes les figurines alliées à moins de 6" du Héros peuvent également se déplacer, du moment qu'elles terminent leur mouvement à moins de 6" du Héros qui a déclaré l'Action. Si elles ne sont pas capables de finir à moins de 6" de lui, elles ne pourront pas se déplacer du tout pour la durée du tour. Si une figurine essaie de finir à moins de 6" du Héros qui a déclaré l'Élan, mais rate un jet (comme un test de Franchissement par exemple), elle s'arrête simplement où elle est. De même, toute figurine à portée de l'Élan Héroïque qui choisit de ne pas se déplacer dans le cadre de l'Élan Héroïque ne pourra pas se déplacer du tout lors de ce tour. Le Héros ayant crié "Avec Moi !" doit toujours se déplacer en premier, avant toute figurine alliée affectée par l'Élan Héroïque. </p>
        <p>Veuillez noter qu'un Héros peut déclarer un Élan Héroïque et crier "Avec Moi !" sans nécessairement se déplacer, par choix et même s'il rate un test de Bravoure à cause de la règle spéciale Terreur. Il est simplement en train d'haranguer ses troupes. Cependant, un Héros qui crie "Avec Moi !" et qui fuit à cause de la Démoralisation voit son Élan Héroïque immédiatement annulé. </p><p>Si deux Héros alliés à moins de 6" l'un de l'autre déclarent un Élan Héroïque, et que le premier à se déplacer crie "Avec Moi !", alors le second a deux choix : il peut soit se déplacer dans le cadre de l'Élan du premier Héros, , ce qui annulera son propre Élan, soit abandonner son mouvement - auquel cas il ne pourra pas se déplacer ensuite. Dans ce cas, son Élan est annulé et il ne pourra pas crier "Avec Moi !". </p>
        <p>Si un Héros qui a crié "Avec Moi !" sort de la table, alors toutes les figurines affectées doivent également sortir de la table : celles qui ne peuvent pas le faire ne peuvent pas se déplacer du tout. D'ailleurs, notez que si un Héros crie "Avec Moi !", les figurines à portée ne peuvent sortir de la table que si le Héros en sort lui-même.</p>
      </div>
      <div>
        <h3 className='blue'>Tir Héroïque (phase de Tir)</h3>
        <p>Le Tir Héroïque permet au Héros de tirer avant les autres figurines. Un Héros ne peut déclarer un Tir Héroïque s'il est engagé au combat. </p>
        <h4 className='blue'>"Feu !"</h4>
        <p>Un Héros déclarant un Tir Héroïque peut crier "Feu !", permettant aux figurines alliées à moins de 6'' de lui de tirer avec lui. </p>
        <p>Un Héros n'a pas besoin d'avoir une arme de tir pour crier "Feu !" et n'a pas besoin de tirer en premier. Les figurines affectées n'ont pas besoin de tirer sur la même cible que le Héros - elles peuvent viser n'importe quelle cible viable. Toute figurine à portée du Tir Héroïque mais qui ne tire pas ne pourra plus le faire du tout lors de ce tour.</p>
      </div>
      <div>
        <h3 className='blue'>Combat Héroïque (phase de Combat)</h3>
        <p>Quand un Héros déclare un Combat Héroïque, le combat où le Héros est impliqué est résolu en premier. De plus, si tous les ennemis impliqués dans le combat sont tués, le Héros et toutes les figurines alliées engagées dans le combat (donc à l'exclusion des supports avec lance ou pique) peuvent se déplacer une nouvelle fois avant de reprendre le cours normal de la phase de combat. Ce mouvement supplémentaire peut inclure une charge sur des nouveaux ennemis si vous le souhaitez, et dans ce cas, le combat sera résolu selon l'ordre habituel des combats. Une figurine peut bénéficier d'un seul et unique Combat Héroïque par tour, donc si une figurine qui était impliquée dans un Combat Héroïque se déplace dans un autre Combat Héroïque, elle ne pourra pas se redéplacer à nouveau si le Combat Héroïque est réussi.</p>
        <p> Si une des figurines qui était impliquée dans le Combat Héroïque charge des nouveaux ennemis, la division des combats peut être modifiée. Dès que tous les Combats Héroïques ont été résolus, reformez tous les combats au choix du joueur ayant l'initiative. Il pourra parfois y avoir une situation ou les deux adversaires déclareront un Combat Héroïque avec un Héros engagé dans le même combat. Lorsque cela se produit, déterminez qui fait son Combat Héroïque en premier de manière habituelle. Seul le Combat Héroïque du Héros ainsi choisi en premier sera maintenu - l'autre est aussitôt annulé.</p>
      </div>
    </div>
  )
}

export default home